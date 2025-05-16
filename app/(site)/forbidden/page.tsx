'use client';

import { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { FavouritesContext } from '@/contexts/FavouritesContextProvider';

import "./page.css";
 
export default function ForbiddenPage() {
    const { loadFavouriteGames } = useContext(FavouritesContext);
    const router = useRouter();

    useEffect(() => {
        loadFavouriteGames();   // Update the favourites since user might be having multiple tabs open
        router.refresh();       // Refresh page so that Header is updated accordingly when multiple tabs are open
    }, []);

    return (
        <main id="forbiddenPage">
            <h2 className='forbidden__title'>Forbidden</h2>
            <p className='forbidden__text'>The requested resource is not available for you.</p>
            <Link href="/" className='forbidden__link'>Return Home</Link>
        </main>
    )
}