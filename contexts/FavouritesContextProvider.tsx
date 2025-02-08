'use client';

import { createContext, ReactElement, useState } from "react";
import { FavouritesContextProvider, ContextProviderChildren } from "@/interfaces/interfaces";
import { Game } from "@/types/types";
import { isLocalStorageAvailable } from "@/utils/utils";

export const FavouritesContext = createContext<FavouritesContextProvider>({} as FavouritesContextProvider);

export function FavouritesContexProvider({ children }: ContextProviderChildren): ReactElement {
    const [ favouritesList, setFavouritesList ] = useState<Game[]>([]);

    function storeFavouriteGames(favouritesList: Game[]): void {
        if (isLocalStorageAvailable()) {
            localStorage.setItem('favouriteGames', JSON.stringify(favouritesList));
        } else {
            setFavouritesList(favouritesList);
        }
    }

    function getFavouriteGames(): Game[] {
        if (isLocalStorageAvailable()) {
            return JSON.parse(localStorage.getItem('favouriteGames') || '');
        } else {
            return favouritesList;
        }
    }

    return (
        <FavouritesContext.Provider value={{ getFavouriteGames, storeFavouriteGames }}>
            { children }
        </FavouritesContext.Provider>
    );
}