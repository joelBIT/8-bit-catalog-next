import { ReactNode } from "react";
import { Game } from "@/types/types";

export interface FavouritesContextProvider {
    getFavouriteGames: () => Game[];
    storeFavouriteGames: (favouritesList: Game[]) => void;
}

export interface ContextProviderChildren {
    children: ReactNode;
}