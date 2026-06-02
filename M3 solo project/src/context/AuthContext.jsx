import { createContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase/firebaseClient";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

function getGreetingName(user) {
  const displayName = user?.displayName?.trim();

  if (displayName) {
    return displayName.split(/\s+/)[0];
  }

  return user?.email?.split("@")[0] || "there";
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signup = async (email, password, profile = {}) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const displayName = [profile.firstName, profile.surname]
      .map((name) => name?.trim())
      .filter(Boolean)
      .join(" ");

    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }

    return userCredential;
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = useMemo(() => {
    const isLoggedIn = Boolean(user);

    return {
      user,
      loading,
      login,
      loginWithGoogle,
      signup,
      logout,
      isLoggedIn,
      greetingName: isLoggedIn ? getGreetingName(user) : "",
    };
  }, [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
