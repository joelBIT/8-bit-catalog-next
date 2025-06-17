'use client';

import { createContext, ReactElement, useEffect, useState } from "react";
import { ContextProviderChildren, AccountsContextProvider } from "@/app/_interfaces/interfaces";
import { User } from "@/app/_types/types";
import { getUserFromSession } from "@/app/_session/utils";

export const AccountContext = createContext<AccountsContextProvider>({} as AccountsContextProvider);

/**
 * This is the context for an authenticated user in the account environment.
 */
export function AccountContextProvider({ children }: ContextProviderChildren): ReactElement {
    const [ user, setUser ] = useState<User>({} as User);

    useEffect(() => {
        addUser();
    }, []);

    async function addUser(): Promise<void> {
        const authenticatedUser = await getUserFromSession();
        console.log(authenticatedUser);
        if (authenticatedUser) {
            setUser(authenticatedUser);
        }
    }

    return (
        <AccountContext.Provider value={{ user, addUser }}>
            { children }
        </AccountContext.Provider>
    );
}