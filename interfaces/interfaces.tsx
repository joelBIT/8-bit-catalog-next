import { ReactNode } from "react";
import { Game } from "@/types/types";

export interface FavouritesContextProvider {
    favouritesList: Game[];
    addFavouriteGame: (game: Game) => void;
    removeFavouriteGame: (game: Game) => void;
    favouritesPage: number;
    setFavouritesPage: (page: number) => void;
    totalPages: number;
    setIsLoggedIn: (loggedIn: boolean) => void;
}

export interface ContextProviderChildren {
    children: ReactNode;
}