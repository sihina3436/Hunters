
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqcP7aKqZbdxlvBGZuKSw5yAdagtK30Z0",
  authDomain: "zero-z-cloths.firebaseapp.com",
  projectId: "zero-z-cloths",
  storageBucket: "zero-z-cloths.appspot.com", 
  messagingSenderId: "650303740055",
  appId: "1:650303740055:web:b4e8461fce29009cc6f1d2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

