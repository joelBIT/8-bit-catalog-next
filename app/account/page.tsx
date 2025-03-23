'use client';

import { ReactElement, useContext, useEffect } from "react";
import { FavouritesContext } from "@/contexts/FavouritesContextProvider";

import "./page.css";

export default function AccountPage(): ReactElement {
    const { loadFavouriteGames } = useContext(FavouritesContext);

    useEffect(() => {
        loadFavouriteGames();       // Updates the favourite list because users are redirected here when logging in or registering
    }, []);

    return (
        <main id="accountPage">
            <h1> Logged in </h1>
        </main>
    );
}