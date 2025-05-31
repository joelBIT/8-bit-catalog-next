import { ReactNode } from "react";
import { Game, User } from "@/app/_types/types";

export interface FavouritesContextProvider {
    favouritesList: Game[];
    addFavouriteGame: (game: Game) => void;
    removeFavouriteGame: (game: Game) => void;
    favouritesPage: number;
    setFavouritesPage: (page: number) => void;
    totalPages: number;
    loadFavouriteGames: () => void;
    gridView: boolean;
    toggleGridView: () => void;
}

export interface GamesContextProvider {
    selectedGame: Game;
    setSelectedGame: (game: Game) => void;
    gridView: boolean;
    toggleGridView: () => void;
}
export interface AccountContextProvider {
    user: User;
    addUser: () => Promise<void>
}

export interface ContextProviderChildren {
    children: ReactNode;
}