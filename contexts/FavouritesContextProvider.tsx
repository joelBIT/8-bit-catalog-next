'use client';

import { createContext, ReactElement, useEffect, useState } from "react";
import { FavouritesContextProvider, ContextProviderChildren } from "@/interfaces/interfaces";
import { Game } from "@/types/types";
import { isLocalStorageAvailable } from "@/utils/utils";

export const FavouritesContext = createContext<FavouritesContextProvider>({} as FavouritesContextProvider);

/**
 * Favourite games are placed in localstorage if localstorage is available. If not available, the favourite games
 * are only stored in this Context's favouritesList variable.
 */
export function FavouritesContexProvider({ children }: ContextProviderChildren): ReactElement<ReactElement> {
    const [ favouritesList, setFavouritesList ] = useState<Game[]>([]);
    const STORAGE_KEY = 'favouriteGames';

    /**
     * Load favourite games from localstorage if localstorage is available.
     */
    useEffect(() => {
        if (isLocalStorageAvailable()) {
            if (localStorage.getItem(STORAGE_KEY)) {
                setFavouritesList(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
            } else {
                localStorage.setItem(STORAGE_KEY, '[]');
            }
        }
    }, []);

    function sortFavourites(favourites: Game[]) {
        return favourites.sort((a, b) => a.title.localeCompare(b.title));
    }

    /**
     * Adds a game as a favourite in localstorage if localstorage is available.
     */
    function addFavouriteGame(game: Game): void {
        if (isLocalStorageAvailable()) {
            setFavouritesList(sortFavourites([...favouritesList, game]));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sortFavourites([...favouritesList, game])));
        } else {
            setFavouritesList(sortFavourites([...favouritesList, game]));
        }
    }

    /**
     * Removes a game from the list of favourites in localstorage if localstorage is available.
     */
    function removeFavouriteGame(game: Game): void {
        if (isLocalStorageAvailable()) {
            const games = favouritesList.filter((favourite: { id: number; }) => favourite.id !== game.id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
            setFavouritesList(games);
        } else {
            setFavouritesList(favouritesList.filter((favourite: { id: number; }) => favourite.id !== game.id));
        }
    }

    return (
        <FavouritesContext.Provider value={{ favouritesList, addFavouriteGame, removeFavouriteGame }}>
            { children }
        </FavouritesContext.Provider>
    );
}