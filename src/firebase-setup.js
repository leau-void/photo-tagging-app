import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-8SMbzpGTDUhqjKSM7jL6sp06aVznF6Y",
  authDomain: "photo-tagging-app-36ac3.firebaseapp.com",
  projectId: "photo-tagging-app-36ac3",
  storageBucket: "photo-tagging-app-36ac3.appspot.com",
  messagingSenderId: "1043049723806",
  appId: "1:1043049723806:web:6e4f1bbea84120571fc88f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export {app, db}