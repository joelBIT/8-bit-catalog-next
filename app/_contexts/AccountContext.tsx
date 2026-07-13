'use client';

import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { User } from "../_db/schema/auth/users";
import { Address } from "../_db/schema/addresses";
import { Profile } from "../_db/schema/profiles";
import { getAddressByUserIdRequest, getProfileByUserIdRequest } from "../_client/client";
import { authClient } from "../auth-client";

export interface AccountContextProvider {
    user: User;
    profile: Profile;
    address: Address;
    addUser: () => Promise<void>;
}

export const AccountContext = createContext<AccountContextProvider>({} as AccountContextProvider);

/**
 * This is the context for an authenticated user in the account environment.
 */
export function AccountProvider({ children }: { children: ReactNode }): ReactElement {
    const [user, setUser] = useState<User>({} as User);
    const [profile, setProfile] = useState<Profile>({} as Profile);
    const [address, setAddress] = useState<Address>({} as Address);
    const { data: session } = authClient.useSession();

    useEffect(() => {
        addUser();
    }, []);

    async function addUser(): Promise<void> {
        if (session) {
            const userId = session.user.id;
            //setUser();
            try {
                const profile = await getProfileByUserIdRequest(userId);
                setProfile(profile);
                const address = await getAddressByUserIdRequest(userId);
                setAddress(address);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <AccountContext.Provider value={{ user, addUser, profile, address }}>
            { children }
        </AccountContext.Provider>
    );
}