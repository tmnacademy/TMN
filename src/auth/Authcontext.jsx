import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config.js";

export const AuthContext = createContext({ user: undefined, loading: true });

export function AuthProvider({ children }) {
    // Seed with auth.currentUser so on page refresh the user is available
    // immediately from localStorage — no flicker, no redirect loop.
    const [user,    setUser]    = useState(() => auth.currentUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // onAuthStateChanged fires once on mount with the persisted user,
        // then again on any login/logout. This is the source of truth.
        const unsub = onAuthStateChanged(auth, u => {
            setUser(u);
            setLoading(false);
        });
        return unsub;
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}