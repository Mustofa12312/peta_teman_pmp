// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbVaBRswW6biTniF9D4Sk8UnvjRFFqui4",
  authDomain: "peta-teman.firebaseapp.com",
  projectId: "peta-teman",
  storageBucket: "peta-teman.firebasestorage.app",
  messagingSenderId: "571568239534",
  appId: "1:571568239534:web:8f998cc328f0551c2c4e3f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
