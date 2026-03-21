import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config.js";

// Drop-in hook — works anywhere without needing AuthProvider wrapper.
// Firebase reads from localStorage automatically on every page load.
export function useAuth() {
    const [user,    setUser]    = useState(auth.currentUser); // sync read on init
    const [loading, setLoading] = useState(!auth.currentUser); // skip loading if already known

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, u => {
            setUser(u);
            setLoading(false);
        });
        return unsub;
    }, []);

    return { user, loading };
}