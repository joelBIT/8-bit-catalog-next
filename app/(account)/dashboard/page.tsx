'use client';

import { ReactElement, useContext, useEffect } from "react";
import { FavouritesContext } from "@/contexts/FavouritesContextProvider";
import { AccountContext } from "@/contexts/AccountContextProvider";
import { EditUserDetailsForm } from "@/components/account";

import "./page.css";

/**
 * The dashboard of the account section.
 */
export default function DashboardPage(): ReactElement {
    const { loadFavouriteGames } = useContext(FavouritesContext);
    const { user } = useContext(AccountContext);

    useEffect(() => {
        loadFavouriteGames();       // Updates the favourite list because users are redirected here when logging in or registering
    }, []);

    return (
        <main id="dashboardPage">
            <article className="user-information">
                <h1> Role: { user.role } </h1>
                <h1> Email: { user.email } </h1>
            </article>

            <EditUserDetailsForm />
        </main>
    );
}