'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

import "./page.css";
 
export default function ForbiddenPage() {
    const router = useRouter();

    useEffect(() => {
        router.refresh();       // Refresh page so that Header is updated accordingly
    }, []);

    return (
        <main id="forbiddenPage">
            <h2 className='forbidden__title'>Forbidden</h2>
            <p className='forbidden__text'>The requested resource is not available for you.</p>
            <Link href="/">Return Home</Link>
        </main>
    )
}