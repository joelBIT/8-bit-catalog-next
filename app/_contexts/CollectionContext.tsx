'use client';

import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { Game } from "../_db/schema/games";
import { isLocalStorageAvailable } from "@/app/_utils/utils";
import { addFavouriteGameToDatabaseRequest, deleteFavouriteGameFromDatabaseRequest, getFavouritesRequest } from "@/app/_client/client";
import { authClient } from "../auth-client";

export interface CollectionContextProvider {
    favouritesList: Game[];
    isLoading: boolean;
    addFavouriteGame: (game: Game) => void;
    removeFavouriteGame: (game: Game) => void;
    isFavourite: (gameId: number) => boolean;
}

export const CollectionContext = createContext<CollectionContextProvider | undefined>(undefined);

/**
 * Favourite games are kept in a database for users with active sessions. Localstorage is used if there is no active session.
 * If local storage is not available, the colelction of games are only temporarily stored in this Context's favouritesList variable.
 */
export function CollectionProvider({ children }: { children: ReactNode }): ReactElement {
    const [favouritesList, setFavouritesList] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);      // true until the first request has finished
    const { data: session, isPending } = authClient.useSession();
    const isLoggedIn = !!session;           // a boolean is stable; the session object may change identity on refresh
    const STORAGE_KEY = 'favouriteGames';

    useEffect(() => {
        if (isPending) {
            return;                         // wait until we know whether there is a session
        }

        if (!isLoggedIn) {
            setFavouritesList(readGuestFavourites());   // always reset: clears the previous user's list on logout
            setIsLoading(false);
            return;
        }

        let cancelled = false;                  // If a user logs out while getFavouritesRequest is still in flight, the late response would otherwise re-populate the list with the account’s favourites after logout.
        getFavouritesRequest().then(games => {
            if (!cancelled && games) {      // ignore the response if the user logged out meanwhile
                setFavouritesList(games ?? []);
            }
        });
        setIsLoading(false);

        return () => { cancelled = true; };
    }, [isLoggedIn, isPending]);

    /** 
     * Reads the guest's favourites from localStorage. Returns [] if unavailable or corrupt. 
     */
    function readGuestFavourites(): Game[] {
        if (!isLocalStorageAvailable()) {
            return [];
        }
        try {
            const games = localStorage.getItem(STORAGE_KEY);
            if (games) {
                return JSON.parse(games);
            }
            localStorage.setItem(STORAGE_KEY, '[]');        // Create storage since it did not exist
        } catch {
            return [];
        }

        return [];
    }

    function sortFavourites(favourites: Game[]): Game[] {
        return favourites.sort((a, b) => a.title.localeCompare(b.title));
    }

    /**
     * Adds a game as a favourite in localstorage if localstorage is available. Updates the total number of favourite pages
     * to be consistent with the number of favourite games.
     */
    function addFavouriteGame(game: Game): void {
        if (favouritesList.some(favourite => favourite.id === game.id)) {
            return;
        }

        const games = sortFavourites([...favouritesList, game]);

        if (isLoggedIn) {
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
    function removeFavouriteGame(game: Game): void {
        const games = favouritesList.filter((favourite: { id: number; }) => favourite.id !== game.id);

        if (isLoggedIn) {
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
        <CollectionContext.Provider value={{ favouritesList, isLoading, addFavouriteGame, removeFavouriteGame, isFavourite }}>
            { children }
        </CollectionContext.Provider>
    );
}
