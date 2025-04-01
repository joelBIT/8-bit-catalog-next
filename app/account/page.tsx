'use client';

import { ReactElement, useContext, useEffect, useState } from "react";
import { FavouritesContext } from "@/contexts/FavouritesContextProvider";
import { EditAccountForm } from "@/components/account/EditAccountForm";
import { EditProfileForm } from "@/components/account/EditProfileForm";
import { getUserFromSession } from "../utils/utils";
import { User } from "@/types/types";

import "./page.css";

export default function AccountPage(): ReactElement {
    const { loadFavouriteGames } = useContext(FavouritesContext);
    const [ user, setUser ] = useState<User>();

    useEffect(() => {
        loadFavouriteGames();       // Updates the favourite list because users are redirected here when logging in or registering
        getUser();
    }, []);

    async function getUser() {
        const response = await getUserFromSession();
        if (response) {
            setUser(response);
        }
    }

    return (
        <main id="accountPage">
            <h1 className="accountPage__title">Account</h1>
            <section className="accountPage__forms">
                { user ? <EditAccountForm user={user} /> : <></> }
                { user ? <EditProfileForm user={user} /> : <></> }
            </section>
        </main>
    );
}