'use client';

import { createContext, ReactElement, useEffect, useState } from "react";
import { FavouritesContextProvider, ContextProviderChildren } from "@/app/_interfaces/interfaces";
import { Game } from "@/app/_types/types";
import { isLocalStorageAvailable, PAGINATION_PAGE_SIZE } from "@/app/_utils/utils";
import { addFavouriteGameToDatabase, deleteFavouriteGameFromDatabase, getFavourites } from "@/app/_client/client";
import { isAuthenticated } from "@/app/_session/utils";

export const FavouritesContext = createContext<FavouritesContextProvider>({} as FavouritesContextProvider);

/**
 * Favourite games are kept in a database for users with active sessions. Localstorage is used if there is no active session.
 * Favourite games are placed in localstorage if localstorage is available. If not available, the favourite games
 * are only temporarily stored in this Context's favouritesList variable.
 */
export function FavouriteContextProvider({ children }: ContextProviderChildren): ReactElement {
    const [ favouritesList, setFavouritesList ] = useState<Game[]>([]);
    const [ favouritesPage, setFavouritesPage ] = useState<number>(1);      // Used for pagination
    const [ totalPages, setTotalPages ] = useState<number>(1);              // Total number of favourite pages
    const STORAGE_KEY = 'favouriteGames';

    useEffect(() => {
        loadFavouriteGames();     
    }, []);

    /**
     * Load favourite games from database if user is logged in. Otherwise, load favourite games from localstorage if localstorage is available.
     */
    async function loadFavouriteGames(): Promise<void> {
        setFavouritesPage(1);       // Is set to the first page when favourite games are loaded
        const authenticated = await isAuthenticated();      // Check if user has an active session
        if (authenticated) {
            getFavouriteGames();
        } else if (isLocalStorageAvailable()) {
            if (localStorage.getItem(STORAGE_KEY)) {
                const games = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
                setFavouritesList(games);
                setTotalPages(getTotalPages(games));
            } else {
                localStorage.setItem(STORAGE_KEY, '[]');
            }
        }
    }

    /**
     * Get the favourite games for a user (with an active session) from the DB.
     */
    async function getFavouriteGames(): Promise<void> {
        const games = await getFavourites();
        setFavouritesList(games);
        setTotalPages(getTotalPages(games));
    }

    /**
     * Get the total number of pages containing favourite games.
     */
    function getTotalPages(games: Game[]): number {
        if (games.length > PAGINATION_PAGE_SIZE && (games.length % PAGINATION_PAGE_SIZE === 0)) {
            return Math.floor(games.length / PAGINATION_PAGE_SIZE);
        }
        return (Math.floor(games.length / PAGINATION_PAGE_SIZE) + 1);
    }

    function sortFavourites(favourites: Game[]): Game[] {
        return favourites.sort((a, b) => a.title.localeCompare(b.title));
    }

    /**
     * Adds a game as a favourite in localstorage if localstorage is available. Updates the total number of favourite pages
     * to be consistent with the number of favourite games.
     */
    async function addFavouriteGame(game: Game): Promise<void> {
        const games = sortFavourites([...favouritesList, game]);

        const authenticated = await isAuthenticated();
        if (authenticated) {
            setFavouritesList(games);
            addFavouriteGameToDatabase(game.id);
        } else if (isLocalStorageAvailable()) {
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
    async function removeFavouriteGame(game: Game): Promise<void> {
        const games = favouritesList.filter((favourite: { id: number; }) => favourite.id !== game.id);
        const authenticated = await isAuthenticated();
        if (authenticated) {
            setFavouritesList(games);
            deleteFavouriteGameFromDatabase(game.id);
        } else if (isLocalStorageAvailable()) {
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

    function isEmptyLastPage(): boolean {
        return (favouritesList.length - 1) % PAGINATION_PAGE_SIZE === 0;
    }

    return (
        <FavouritesContext.Provider value={{ favouritesList, addFavouriteGame, removeFavouriteGame, favouritesPage, setFavouritesPage, totalPages }}>
            { children }
        </FavouritesContext.Provider>
    );
}