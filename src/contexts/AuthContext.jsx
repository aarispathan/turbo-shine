import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsub;
    }, []);

    const value = {
        currentUser,
        loading,
        auth, // ✅ IMPORTANT: Pass auth explicitly
        emailLogin: (email, password) => signInWithEmailAndPassword(auth, email, password),
        emailSignup: (email, password) => createUserWithEmailAndPassword(auth, email, password),
        googleLogin: () => signInWithPopup(auth, googleProvider),
        logout: () => signOut(auth),
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
