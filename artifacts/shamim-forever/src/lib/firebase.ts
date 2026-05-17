import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDy68zNh9354-QPtEeg1vkm478M1azIJmI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "shamimforever-e3d05.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "shamimforever-e3d05",
  storageBucket: "shamimforever-e3d05.firebasestorage.app",
  messagingSenderId: "555332403921",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:555332403921:web:d3dca1ce181ce15f21fbf0",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-MDMZZLR3P9",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const analytics = typeof window !== "undefined" ? getAnalytics(firebaseApp) : null;
