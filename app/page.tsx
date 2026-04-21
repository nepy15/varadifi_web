'use client';

import { useEffect, useState } from 'react';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, getDocs, deleteDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';

import NavBar from "./ui/navbar";
import Login from "./login";

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

  function refreshPage() {
    console.log("Refreshing page...");
    window.location.reload();
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

  if (!user) {
    return <Login auth={auth} />;
  }

  return (
    <div className="flex min-h-screen">
      <NavBar />
      <main className="flex-1 justify-items-center">
        <div className='mb-4 mt-15 flex flex-row gap-2 items-center p-2'>
          <h1 className="text-2xl font-bold">Rendelesek</h1>
          <div className='p-2 bg-green-950 rounded-full ml-5 active:bg-lime-600 hover:bg-lime-700 cursor-pointer absolute right-15 top-15' onClick={refreshPage}>Reload</div>
        </div>
        <ul>
          {ordersSnapshot.docs.map((doc) => (
            <li key={doc.id}>
              <div className='bg-light-bg m-5 w-80 h-40 rounded-2xl justify-items-center flex flex-col relative'>
                <p className='mb-3 mt-2 font-semibold self-center flex'>{doc.data().name}</p>
                <p className='ml-1.5'>
                  <label className='font-semibold'>Nem:</label> {doc.data().gender}
                </p>
                <p className='ml-1.5'>
                  <label className='font-semibold'>Telefonszam:</label> {doc.data().phoneNumber}
                </p>
                <p className='ml-1.5'>
                  <label className='font-semibold'>Rendelési ID:</label> {doc.data().orderId}
                </p>
                <p className='ml-1.5'>
                  <label className='font-semibold'>Méret:</label> {doc.data().size}
                </p>
                <div className='w-full h-full bg-red-800 hover:bg-red-600 transition-colors duration-200 items-center justify-center flex rounded-b-2xl bottom-0 cursor-pointer select-none' onClick={async () => {
                  await deleteDoc(doc.ref);
                  window.location.reload();
                }}>Delete</div>
              </div>
            </li>
          ))}
        </ul>

      </main>
    </div>
  );
}