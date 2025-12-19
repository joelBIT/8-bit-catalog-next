'use client';

import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { User } from "@/app/_types/types";
import { getUserFromSession } from "@/app/_session/utils";

export interface AccountContextProvider {
    user: User;
    addUser: () => Promise<void>;
}

export const AccountContext = createContext<AccountContextProvider>({} as AccountContextProvider);

/**
 * This is the context for an authenticated user in the account environment.
 */
export function AccountProvider({ children }: { children: ReactNode }): ReactElement {
    const [user, setUser] = useState<User>({} as User);

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
        <AccountContext.Provider value={{ user, addUser }}>
            { children }
        </AccountContext.Provider>
    );
}