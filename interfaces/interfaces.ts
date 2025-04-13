import { ReactNode } from "react";
import { Game, User } from "@/types/types";

export interface FavouritesContextProvider {
    favouritesList: Game[];
    addFavouriteGame: (game: Game) => void;
    removeFavouriteGame: (game: Game) => void;
    favouritesPage: number;
    setFavouritesPage: (page: number) => void;
    totalPages: number;
    loadFavouriteGames: () => void;
}

export interface AccountContextProvider {
    user: User;
    addUser: () => Promise<void>
}

export interface ContextProviderChildren {
    children: ReactNode;
}