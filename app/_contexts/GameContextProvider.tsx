'use client';

import { createContext, ReactElement, useState } from "react";
import { ContextProviderChildren, GamesContextProvider } from "@/app/_interfaces/interfaces";
import { Game } from "@/app/_types/types";

export const GameContext = createContext<GamesContextProvider>({} as GamesContextProvider);

/**
 * Favourite games are kept in a database for users with active sessions. Localstorage is used if there is no active session.
 * Favourite games are placed in localstorage if localstorage is available. If not available, the favourite games
 * are only temporarily stored in this Context's favouritesList variable.
 */
export function GameContextProvider({ children }: ContextProviderChildren): ReactElement {
    const [ selectedGame, setSelectedGame ] = useState<Game>({} as Game);
    const [ gridView, setGridView ] = useState<boolean>(true);              // The chosen list view for game lists

    function toggleGridView(): void {
        setGridView(!gridView);
    }

    return (
        <GameContext.Provider value={{ selectedGame, setSelectedGame, gridView, toggleGridView }}>
            { children }
        </GameContext.Provider>
    );
}