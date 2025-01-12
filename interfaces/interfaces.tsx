import { ReactNode } from "react";
import { Game } from "@/types/types";

export interface FavouritesContextProvider {
    favouritesList: Game[];
    setFavouritesList: (favouritesList: Game[]) => void;
}

export interface ContextProviderChildren {
    children: ReactNode;
}