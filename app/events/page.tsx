'use client';

import NavBar from "../ui/navbar";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Login from "../login";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCsHup70X2ggKKbHSv9sLIP0odpExwVGBc",
  authDomain: "varadifi-app.firebaseapp.com",
  projectId: "varadifi-app",
  storageBucket: "varadifi-app.firebasestorage.app",
  messagingSenderId: "1074929957492",
  appId: "1:1074929957492:web:05ebea86da6f1b5eccef21",
  measurementId: "G-V9KZZCGWFV"
});

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const ordersCollection = collection(db, "orders");
const ordersSnapshot = await getDocs(ordersCollection);

export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if(!user) {
        return <Login auth={auth} />;
    }

    return (
        <div className="flex min-h-screen">
            <NavBar />
            <main>
                <h1>Events</h1>
            </main>
        </div>
    );
}