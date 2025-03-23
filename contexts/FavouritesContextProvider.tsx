'use client';

import { createContext, ReactElement, useEffect, useState } from "react";
import { FavouritesContextProvider, ContextProviderChildren } from "@/interfaces/interfaces";
import { Game } from "@/types/types";
import { isLocalStorageAvailable, PAGINATION_PAGE_SIZE } from "@/utils/utils";

export const FavouritesContext = createContext<FavouritesContextProvider>({} as FavouritesContextProvider);

/**
 * Favourite games are placed in localstorage if localstorage is available. If not available, the favourite games
 * are only stored in this Context's favouritesList variable.
 */
export function FavouritesContexProvider({ children }: ContextProviderChildren): ReactElement<ReactElement> {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);      // Get this from the user session instead?
    const [ favouritesList, setFavouritesList ] = useState<Game[]>([]);
    const [ favouritesPage, setFavouritesPage ] = useState<number>(1);      // Used for pagination
    const [ totalPages, setTotalPages ] = useState<number>(1);              // Total number of favourite pages
    const STORAGE_KEY = 'favouriteGames';

    /**
     * Load favourite games from database if user is logged in. Otherwise, load favourite games from localstorage if localstorage is available.
     */
    useEffect(() => {
        if (isLoggedIn) {
            
        } else if (isLocalStorageAvailable()) {
            if (localStorage.getItem(STORAGE_KEY)) {
                const games = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
                setFavouritesList(games);
                setTotalPages(getTotalPages(games));
            } else {
                localStorage.setItem(STORAGE_KEY, '[]');
            }
        }
    }, []);

    /**
     * Get the total number of pages containing favourite games.
     */
    function getTotalPages(games: Game[]) {
        if (games.length > PAGINATION_PAGE_SIZE && (games.length % PAGINATION_PAGE_SIZE === 0)) {
            return Math.floor(games.length / PAGINATION_PAGE_SIZE);
        }
        return (Math.floor(games.length / PAGINATION_PAGE_SIZE) + 1);
    }

    function sortFavourites(favourites: Game[]) {
        return favourites.sort((a, b) => a.title.localeCompare(b.title));
    }

    /**
     * Adds a game as a favourite in localstorage if localstorage is available. Updates the total number of favourite pages
     * to be consistent with the number of favourite games.
     */
    function addFavouriteGame(game: Game): void {
        const games = sortFavourites([...favouritesList, game]);

        if (isLocalStorageAvailable()) {
            setFavouritesList(games);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
        } else {
            setFavouritesList(sortFavourites(games));
        }

        setTotalPages(getTotalPages(games));
    }

    /**
     * Removes a game from the list of favourites in localstorage if localstorage is available. Updates the total number of favourite pages
     * to be consistent with the number of favourite games.
     */
    function removeFavouriteGame(game: Game): void {
        if (isLocalStorageAvailable()) {
            const games = favouritesList.filter((favourite: { id: number; }) => favourite.id !== game.id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
            setFavouritesList(games);
        } else {
            setFavouritesList(favouritesList.filter((favourite: { id: number; }) => favourite.id !== game.id));
        }

        updateFavouritePage();
    }

    // Change to the previous page if all favourite games of the last favourite page are removed.
    function updateFavouritePage(): void {
        if (isLastFavouritePage() && isEmptyLastPage()) {
            setFavouritesPage(favouritesPage > 1 ? favouritesPage - 1 : 1);
            setTotalPages(totalPages - 1);
        } else if (isEmptyLastPage()) {
            setTotalPages(totalPages - 1);
        }
    }

    function isLastFavouritePage(): boolean {
        return favouritesPage === Math.floor(favouritesList.length / PAGINATION_PAGE_SIZE) + 1;
    }

    function isEmptyLastPage() {
        return (favouritesList.length - 1) % PAGINATION_PAGE_SIZE === 0;
    }

    return (
        <FavouritesContext.Provider value={{ favouritesList, addFavouriteGame, removeFavouriteGame, favouritesPage, setFavouritesPage, totalPages, setIsLoggedIn }}>
            { children }
        </FavouritesContext.Provider>
    );
}