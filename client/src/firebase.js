// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "adhyatma-ce6a3.firebaseapp.com",
  projectId: "adhyatma-ce6a3",
  storageBucket: "adhyatma-ce6a3.appspot.com",
  messagingSenderId: "4912689961",
  appId: "1:4912689961:web:7a5c7bbd513fdaa9dcfd38",
  measurementId: "G-2BC0XYC3TV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
