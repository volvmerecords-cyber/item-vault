import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, firebaseProjectId } from "../firebase/firebaseClient";
import useAuth from "../hooks/useAuth";
import ProductContext from "./ProductContextValue";

export function ProductProvider({ children }) {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const pendingDeleteIds = useRef(new Set());

  useEffect(() => {
    if (!user) {
      return;
    }

    const itemQuery = query(
      collection(db, "items"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      itemQuery,
      (snapshot) => {
        const snapshotIds = new Set(snapshot.docs.map((itemDoc) => itemDoc.id));

        pendingDeleteIds.current.forEach((itemId) => {
          if (!snapshotIds.has(itemId)) {
            pendingDeleteIds.current.delete(itemId);
          }
        });

        const items = snapshot.docs
          .filter((itemDoc) => !pendingDeleteIds.current.has(itemDoc.id))
          .map((itemDoc) => ({
            ...itemDoc.data(),
            id: itemDoc.id,
          }));
        setProducts(items);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore error:", error);
        setProducts([]);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  const addProduct = useCallback(async (product) => {
    if (!user) {
      throw new Error("You must be logged in to add an item.");
    }

    const itemData = {
      ...product,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    };

    const itemRef = await addDoc(collection(db, "items"), itemData);
    return { id: itemRef.id, ...itemData };
  }, [user]);

  const updateProduct = useCallback(async (id, updates) => {
    const itemRef = doc(db, "items", id);
    await updateDoc(itemRef, updates);
  }, []);

  const deleteProduct = useCallback(async (id) => {
    if (!user) {
      throw new Error("You must be logged in to delete an item.");
    }

    const productToDelete = products.find((product) => product.id === id);

    if (!productToDelete) {
      throw new Error("This item could not be found.");
    }

    if (productToDelete.userId !== user.uid) {
      throw new Error("You do not have permission to delete this item.");
    }

    pendingDeleteIds.current.add(id);
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id)
    );

    try {
      try {
        const idToken = await user.getIdToken(true);
        const documentName =
          `projects/${firebaseProjectId}/databases/(default)/documents/items/${id}`;
        const response = await fetch(
          `https://firestore.googleapis.com/v1/projects/${firebaseProjectId}` +
            "/databases/(default)/documents:commit",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${idToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              writes: [{ delete: documentName }],
            }),
          }
        );

        if (!response.ok) {
          const responseBody = await response.json().catch(() => null);
          const firebaseMessage = responseBody?.error?.message;
          throw new Error(
            firebaseMessage || `Delete failed with status ${response.status}.`
          );
        }
      } catch (restError) {
        console.warn("Firestore REST delete failed; trying SDK delete.", {
          message: restError instanceof Error ? restError.message : String(restError),
        });

        await deleteDoc(doc(db, "items", id));
      }
    } catch (error) {
      pendingDeleteIds.current.delete(id);
      setProducts((currentProducts) => {
        if (currentProducts.some((product) => product.id === id)) {
          return currentProducts;
        }

        return [productToDelete, ...currentProducts].sort((itemA, itemB) => {
          const dateA = Date.parse(itemA.createdAt) || 0;
          const dateB = Date.parse(itemB.createdAt) || 0;
          return dateB - dateA;
        });
      });

      console.error("Firestore delete failed:", error);
      throw new Error(
        "The item could not be deleted. Please log out, sign in again, and retry.",
        { cause: error }
      );
    }
  }, [products, user]);

  const getProductById = useCallback(
    (id) => products.find((product) => product.id === id),
    [products]
  );

  const value = useMemo(
    () => ({ products, loading, addProduct, updateProduct, deleteProduct, getProductById }),
    [products, loading, addProduct, updateProduct, deleteProduct, getProductById]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
