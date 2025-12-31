'use client';

import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { Game } from "../_db/schema/games";
import { isLocalStorageAvailable } from "@/app/_utils/utils";
import { addFavouriteGameToDatabaseRequest, deleteFavouriteGameFromDatabaseRequest, getFavouritesRequest } from "@/app/_client/client";
import { isAuthenticated } from "@/app/_session/sessionUtils";

export interface FavouritesContextProvider {
    favouritesList: Game[];
    addFavouriteGame: (game: Game) => void;
    removeFavouriteGame: (game: Game) => void;
    isFavourite: (gameId: number) => boolean;
}

export const FavouritesContext = createContext<FavouritesContextProvider>({} as FavouritesContextProvider);

/**
 * Favourite games are kept in a database for users with active sessions. Localstorage is used if there is no active session.
 * Favourite games are placed in localstorage if localstorage is available. If not available, the favourite games
 * are only temporarily stored in this Context's favouritesList variable.
 */
export function FavouritesProvider({ children }: { children: ReactNode }): ReactElement {
    const [favouritesList, setFavouritesList] = useState<Game[]>([]);
    const STORAGE_KEY = 'favouriteGames';

    useEffect(() => {
        loadFavouriteGames();     
    }, []);

    /**
     * Load favourite games from database if user is logged in. Otherwise, load favourite games from localstorage if localstorage is available.
     */
    async function loadFavouriteGames(): Promise<void> {
        const authenticated = await isAuthenticated();      // Check if user has an active session
        if (authenticated) {
            getFavouriteGames();
        } else if (isLocalStorageAvailable()) {
            if (localStorage.getItem(STORAGE_KEY)) {
                const games = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
                setFavouritesList(games);
            } else {
                localStorage.setItem(STORAGE_KEY, '[]');
            }
        }
    }

    /**
     * Get the favourite games for a user (with an active session) from the DB.
     */
    async function getFavouriteGames(): Promise<void> {
        const games = await getFavouritesRequest();
        setFavouritesList(games);
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
            addFavouriteGameToDatabaseRequest(game.id);
        } else if (isLocalStorageAvailable()) {
            setFavouritesList(games);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
        }
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
            deleteFavouriteGameFromDatabaseRequest(game.id);
        } else if (isLocalStorageAvailable()) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
            setFavouritesList(games);
        }
    }

    function isFavourite(gameId: number): boolean {
        return favouritesList.some((favourite: { id: number; }) => favourite.id === gameId);
    }

    return (
        <FavouritesContext.Provider value={{ favouritesList, addFavouriteGame, removeFavouriteGame, isFavourite }}>
            { children }
        </FavouritesContext.Provider>
    );
}