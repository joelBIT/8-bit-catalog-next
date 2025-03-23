'use client';

import { ReactElement, useContext, useEffect } from "react";
import { FavouritesContext } from "@/contexts/FavouritesContextProvider";
import { AccountForm } from "@/components/account/AccountForm";

import "./page.css";

export default function AccountPage(): ReactElement {
    const { loadFavouriteGames } = useContext(FavouritesContext);

    useEffect(() => {
        loadFavouriteGames();       // Updates the favourite list because users are redirected here when logging in or registering
    }, []);

    return (
        <main id="accountPage">
            <h1 className="accountPage__title">Account</h1>
            <AccountForm />
        </main>
    );
}