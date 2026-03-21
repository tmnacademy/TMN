import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAc9oWoJVR1UjV_Ef49bUwUCARxbo3kaSQ",
    authDomain: "tmnacademy-1f257.firebaseapp.com",
    projectId: "tmnacademy-1f257",
    storageBucket: "tmnacademy-1f257.firebasestorage.app",
    messagingSenderId: "347623390476",
    appId: "1:347623390476:web:f9f5497410a2502daddd29",
};

const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Firebase uses LOCAL persistence by default — user stays logged in across sessions.
// No need to call setPersistence explicitly.

export default app;