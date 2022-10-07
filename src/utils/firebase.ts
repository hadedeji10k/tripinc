import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeWAacmm0kW_4VIxvS262Y4kMHktXLCbM",
  authDomain: "testing-e9431.firebaseapp.com",
  projectId: "testing-e9431",
  storageBucket: "testing-e9431.appspot.com",
  messagingSenderId: "541607195500",
  appId: "1:541607195500:web:953ed669afa7fdf4777949",
  measurementId: "G-CM9HPJD272",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
