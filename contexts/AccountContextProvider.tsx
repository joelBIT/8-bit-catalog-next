'use client';

import { createContext, ReactElement, useEffect, useState } from "react";
import { ContextProviderChildren, AccountContextProvider } from "@/interfaces/interfaces";
import { User } from "@/types/types";
import { getUserFromSession } from "@/app/_session/utils";

export const AccountContext = createContext<AccountContextProvider>({} as AccountContextProvider);

/**
 * This is the context for an authenticated user in the account environment.
 */
export function AccountContexProvider({ children }: ContextProviderChildren): ReactElement {
    const [ user, setUser ] = useState<User>({} as User);

    useEffect(() => {
        addUser();
    }, []);

    async function addUser(): Promise<void> {
        const authenticatedUser = await getUserFromSession();
        if (authenticatedUser) {
            setUser(authenticatedUser);
        }
    }

    return (
        <AccountContext.Provider value={{ user }}>
            { children }
        </AccountContext.Provider>
    );
}