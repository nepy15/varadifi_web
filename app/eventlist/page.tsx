'use client'

import NavBar from "../ui/navbar";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
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
const eventsCollection = collection(db, "events");

export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [selectedDocId, setSelectedDocId] = useState(null);
    const [newId, setNewId] = useState('');

    const fetchEvents = async () => {
        const snapshot = await getDocs(eventsCollection);
        setEvents(snapshot.docs);
    };

    const updateId = async () => {
        if (!selectedDocId || !newId) return;
        const docRef = doc(db, "events", selectedDocId);
        await updateDoc(docRef, { id: parseInt(newId) });
        fetchEvents();
        setSelectedDocId(null);
        setNewId('');
    };

    const deleteEvent = async (docId) => {
        await deleteDoc(doc(db, "events", docId));
        fetchEvents();
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
            if (user) {
                fetchEvents();
            }
        });

        return () => unsubscribe();
    }, []);

    if(loading) {
        return <div>Loading...</div>;
    }

    if(!user) {
        return <Login auth={auth} />;
    }

    return (
        <div className="flex min-h-screen w-full justify-items-center">
            <NavBar />
            <main className="w-full items-center flex flex-col">
                <div className="flex flex-col m-15 items-center">
                    <h1 className="text-3xl font-bold">Events</h1>
                    <p>Minnel nagyobb az id annal feljebb van a listan.</p>
                </div>
                <div>
                    {selectedDocId && (
                        <div className="mb-4">
                            <input 
                                type="number" 
                                placeholder="New ID" 
                                value={newId} 
                                onChange={(e) => setNewId(e.target.value)} 
                                className="text-center bg-light-bg w-20 h-8 rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none mr-2"
                            />
                            <button onClick={updateId} className="bg-light-bg text-white px-4 py-2 rounded-2xl cursor-pointer">Update ID</button>
                        </div>
                    )}
                </div>
                <ul>
                    {events.map((doc) => (
                        <li key={doc.id}>
                            <div className="flex flex-col gap-2 items-center justify-center p-3 w-auto h-auto bg-light-bg rounded-2xl m-4">
                                <p className="font-bold">{doc.data().title}</p>
                                <p className="mb-3">{doc.data().description}</p>
                                <p>Id: {doc.data().id}</p>
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => { setSelectedDocId(doc.id); setNewId(doc.data().id.toString()); }} 
                                        className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
                                    >
                                        Edit ID
                                    </button>
                                    <button 
                                        onClick={() => deleteEvent(doc.id)} 
                                        className="bg-red-500 text-white px-3 py-1 rounded ml-2 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );


}