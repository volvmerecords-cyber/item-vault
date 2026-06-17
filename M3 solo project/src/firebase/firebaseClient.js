import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuj_B_xAB3pOBWWIZwZxsnUYtirUPaeKw",
  authDomain: "itemvault-1d9c5.firebaseapp.com",
  projectId: "itemvault-1d9c5",
  storageBucket: "itemvault-1d9c5.firebasestorage.app",
  messagingSenderId: "439109090719",
  appId: "1:439109090719:web:d983c23eadb85ee124d1aa",
  measurementId: "G-GZR2GTYZT5",
};

const app = initializeApp(firebaseConfig);

export const firebaseProjectId = firebaseConfig.projectId;
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
export const storage = getStorage(app);
