'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NavButton({ title, path }) {
    const [state, setState] = useState(false);
    const router = useRouter();

    function handleState() {
        router.push(path);

    }

    return (
        <div className='active:bg-green-700 active:duration-0 active:ease-linear hover:bg-green-950 transition-colors ease-in hover:duration-100 w-full h-10 bg-light-bg/50 rounded-lg flex items-center justify-center text-sm font-medium text-light-text cursor-pointer' onClick={handleState}>
            {title}
        </div>
    );
}