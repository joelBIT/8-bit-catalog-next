import { Game } from "@/types/types";
import { ReactNode } from "react";

export interface User {
    id: number,
    username: string,
    isAdmin: boolean,
    isAuthenticated: boolean,
    password: string,
    email: string
}

export interface GameRequest {
    id: number,
    game: Game,
    submitter: User,
    submitted: string,
    status: string
}

export interface FavouritesContextProvider {
    favouritesList: Game[];
    setFavouritesList: (favouritesList: Game[]) => void;
}

export interface AuthContextProvider {
    user: User;
    setUser: (user: User) => void;
}

export interface ContextProviderChildren {
    children: ReactNode;
}