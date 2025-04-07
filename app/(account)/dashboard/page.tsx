'use client';

import { ReactElement, useContext, useEffect } from "react";
import { FavouritesContext } from "@/contexts/FavouritesContextProvider";
import { EditAccountForm } from "@/components/account";

import "./page.css";

/**
 * The dashboard of the account section.
 */
export default function DashboardPage(): ReactElement {
    const { loadFavouriteGames } = useContext(FavouritesContext);

    useEffect(() => {
        loadFavouriteGames();       // Updates the favourite list because users are redirected here when logging in or registering
    }, []);

    return (
        <main id="accountPage">
            <section className="accountPage__forms">
                <EditAccountForm />
            </section>
        </main>
    );
}