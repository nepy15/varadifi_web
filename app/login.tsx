'use client';

import { signInWithEmailAndPassword, Auth } from 'firebase/auth';

export default function Login({ auth }: { auth: Auth }) {
  const handleSignIn = async () => {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    
    if (!email || !password) {
        document.getElementById('label')!.textContent = 'Please fill in all fields';
        return;
    } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password).catch((error) => {
            console.error('Error signing in:', error);
            document.getElementById('label')!.textContent = 'Invalid email or password';
        });
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User is signed in:', userCredential.user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
        <p id='label' className='text-red-600 font-semibold'></p>
      <h1 className='mb-10'>Not logged in</h1>

      <input
        type="email"
        id="email"
        placeholder="Email"
        className="border-2 border-gray-300 rounded-md p-2 mb-4"
      />

      <input
        type="password"
        id="password"
        placeholder="Password"
        className="border-2 border-gray-300 rounded-md p-2 mb-4"
      />

      <button className='bg-light-bg w-35 h-12 rounded-2xl hover:bg-green-950 transition-colors duration-200' onClick={handleSignIn}>
        Sign In
      </button>
    </div>
  );
}