const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDy68zNh9354-QPtEeg1vkm478M1azIJmI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "shamimforever-e3d05.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "shamimforever-e3d05",
  storageBucket: "shamimforever-e3d05.firebasestorage.app",
  messagingSenderId: "555332403921",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:555332403921:web:d3dca1ce181ce15f21fbf0",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-MDMZZLR3P9",
};

let _app: unknown = null;

async function getApp() {
  if (!_app) {
    const { initializeApp } = await import("firebase/app");
    _app = initializeApp(firebaseConfig);
  }
  return _app as import("firebase/app").FirebaseApp;
}

export async function getFirebaseAuth() {
  const app = await getApp();
  const { getAuth } = await import("firebase/auth");
  return getAuth(app);
}

export async function signInWithFirebase(email: string, password: string) {
  try {
    const auth = await getFirebaseAuth();
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    return await signInWithEmailAndPassword(auth, email, password);
  } catch {
    return null;
  }
}

export async function registerWithFirebase(email: string, password: string, name: string) {
  try {
    const auth = await getFirebaseAuth();
    const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth");
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    return cred;
  } catch {
    return null;
  }
}

export function initAnalytics() {
  if (typeof window === "undefined") return;
  getApp().then(async (app) => {
    try {
      const { getAnalytics } = await import("firebase/analytics");
      getAnalytics(app);
    } catch {
    }
  });
}
