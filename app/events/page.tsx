'use client';

import NavBar from "../ui/navbar";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, addDoc, getCountFromServer } from "firebase/firestore";
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

    const sendNotification = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/notify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topic: "Varadifi",
                    title: "Uj alkalom!",
                    body: "Gyere es nezd meg az uj alkalmakat.",
                }),
            });
            if (!res.ok) throw new Error();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    async function submitEvent() {
        const eventName = (document.getElementById('eventName') as HTMLInputElement).value;
        const eventTime = (document.getElementById('eventTime') as HTMLInputElement).value;
        const eventDescription = (document.getElementById('eventDescription') as HTMLInputElement).value;
        const eventLocation = (document.getElementById('eventLocation') as HTMLInputElement).value;
        const eventMonth = (document.getElementById('eventMonth') as HTMLInputElement).value;
        const eventDay = (document.getElementById('eventDay') as HTMLInputElement).valueAsNumber;
        const eventId = await getCountFromServer(eventsCollection).then((snapshot) => snapshot.data().count + 1);

        if (!eventName || !eventTime || !eventDescription || !eventLocation || !eventMonth || !eventDay) {
            alert('Please fill in all fields');
            return;
        } else {
            addDoc(eventsCollection, {
                title: eventName,
                time: eventTime,
                description: eventDescription,
                location: eventLocation,
                month: eventMonth,
                day: eventDay,
                id: eventId
            });
            sendNotification();
                alert('Event added successfully');
        }


    }

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
            <main className="w-full justify-items-center">
                <h1 className="text-2xl font-semibold m-10 text-center">Event hozzáadása</h1>
                <div className="flex flex-col gap-4 w-1/2 mx-auto items-center">
                    <input type="text" id="eventName" placeholder="Event Neve" className="bg-light-bg rounded-md p-2 mb-4 w-60 hover:bg-green-950 transition-colors duration-200" />
                    <input type="text" id="eventTime" placeholder="Ideje (ora pl.: 19:00-21:00)" className="bg-light-bg rounded-md p-2 mb-4 w-60 hover:bg-green-950 transition-colors duration-200" />
                    <input type="text" id="eventDescription" placeholder="Leiras (max 80 karakter)" className="bg-light-bg rounded-md p-2 mb-4 w-60 hover:bg-green-950 transition-colors duration-200" maxLength={80}/>
                    <input type="text" id="eventLocation" placeholder="Helyszín" className="bg-light-bg rounded-md p-2 mb-4 w-60 hover:bg-green-950 transition-colors duration-200" />
                    <div className="w-60 h-min flex items-center justify-center gap-2">
                        <select id="eventMonth" className="bg-light-bg rounded-md p-2 mb-4 w-30 h-10 hover:bg-green-950 transition-colors duration-200">wd
                            <option className="bg-background" value="" >Honap</option>
                            <option className="bg-background" value="JAN">Január</option>
                            <option className="bg-background" value="FEB">Február</option>
                            <option className="bg-background" value="MÁR">Március</option>
                            <option className="bg-background" value="ÁPR">Április</option>
                            <option className="bg-background" value="MÁJ">Május</option>
                            <option className="bg-background" value="JÚN">Június</option>
                            <option className="bg-background" value="JÚL">Július</option>
                            <option className="bg-background" value="AUG">Augusztus</option>
                            <option className="bg-background" value="SZEP">Szeptember</option>
                            <option className="bg-background" value="OKT">Október</option>
                            <option className="bg-background" value="NOV">November</option>
                            <option className="bg-background" value="DEC">December</option>
                        </select>
                        <input type="number" id="eventDay" placeholder="Nap" className="bg-light-bg rounded-md p-2 mb-4 w-18 h-10 hover:bg-green-950 transition-colors duration-200" />
                    </div>
                    <button className="bg-light-bg w-35 h-12 rounded-2xl hover:bg-green-950 transition-colors duration-200" onClick={submitEvent}>Hozzáadás</button>
                </div>
            </main>
        </div>
    );
}