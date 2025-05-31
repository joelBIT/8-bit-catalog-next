'use client';

import { createContext, ReactElement, useState } from "react";
import { ContextProviderChildren, GamesContextProvider } from "@/app/_interfaces/interfaces";
import { Game } from "@/app/_types/types";

export const GameContext = createContext<GamesContextProvider>({} as GamesContextProvider);

/**
 * Localstorage is used to keep track of which view is chosen.
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