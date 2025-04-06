'use client';

import { ReactElement, useContext, useEffect } from "react";
import { FavouritesContext } from "@/contexts/FavouritesContextProvider";
import { EditAccountForm, EditProfileForm } from "@/components/account";

import "./page.css";

export default function AccountPage(): ReactElement {
    const { loadFavouriteGames } = useContext(FavouritesContext);

    useEffect(() => {
        loadFavouriteGames();       // Updates the favourite list because users are redirected here when logging in or registering
    }, []);

    return (
        <main id="accountPage">
            <section className="accountPage__forms">
                <EditAccountForm />
                <EditProfileForm />
            </section>
        </main>
    );
}