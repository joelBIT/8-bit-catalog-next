import { ReactNode } from "react";
import { Game, User } from "@/app/_types/types";
export interface AccountsContextProvider {
    user: User;
    addUser: () => Promise<void>
}

export interface ContextProviderChildren {
    children: ReactNode;
}