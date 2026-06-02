import { createContext, useEffect, useMemo, useState } from "react";
import { collection, query, where, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseClient";
import useAuth from "../hooks/useAuth";

export const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const itemQuery = query(
      collection(db, "items"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      itemQuery,
      (snapshot) => {
        const items = snapshot.docs.map((itemDoc) => ({
          id: itemDoc.id,
          ...itemDoc.data(),
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

  const addProduct = async (product) => {
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
  };

  const updateProduct = async (id, updates) => {
    const itemRef = doc(db, "items", id);
    await updateDoc(itemRef, updates);
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  const getProductById = (id) => products.find((product) => product.id === id);

  const value = useMemo(
    () => ({ products, loading, addProduct, updateProduct, deleteProduct, getProductById }),
    [products, loading]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
