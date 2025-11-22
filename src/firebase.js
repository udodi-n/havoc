import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNCotpUXIuks077HoTVeswLq5HbNY0ad8",
  authDomain: "havoc-edcf9.firebaseapp.com",
  projectId: "havoc-edcf9",
  storageBucket: "havoc-edcf9.firebasestorage.app",
  messagingSenderId: "533799816034",
  appId: "1:533799816034:web:25b7f2a8643192baa3ba3b",
  measurementId: "G-ZN5X48K3GN"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

signInAnonymously(auth)
  .then(() => console.log("Signed in anonymously"))
  .catch(err => console.error("Auth error:", err));