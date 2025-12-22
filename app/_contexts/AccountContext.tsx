'use client';

import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { Profile, User } from "@/app/_types/types";
import { getUserFromSession } from "@/app/_session/utils";
import { getProfileByUserIdRequest } from "../_client/client";

export interface AccountContextProvider {
    user: User;
    profile: Profile;
    addUser: () => Promise<void>;
}

export const AccountContext = createContext<AccountContextProvider>({} as AccountContextProvider);

/**
 * This is the context for an authenticated user in the account environment.
 */
export function AccountProvider({ children }: { children: ReactNode }): ReactElement {
    const [user, setUser] = useState<User>({} as User);
    const [profile, setProfile] = useState<Profile>({} as Profile);

    useEffect(() => {
        addUser();
    }, []);

    async function addUser(): Promise<void> {
        const authenticatedUser = await getUserFromSession();
        if (authenticatedUser) {
            setUser(authenticatedUser);
            try {
                const profile = await getProfileByUserIdRequest(authenticatedUser.id);
                setProfile(profile);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <AccountContext.Provider value={{ user, addUser, profile }}>
            { children }
        </AccountContext.Provider>
    );
}