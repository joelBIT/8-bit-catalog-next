'use client';

import { createContext, ReactElement, ReactNode, useState } from "react";
import { Game } from "../_db/schema/games";

export interface GameContextProvider {
    selectedGame: Game;
    setSelectedGame: (game: Game) => void;
    gridView: boolean;
    toggleGridView: () => void;
}

export const GameContext = createContext<GameContextProvider>({} as GameContextProvider);

/**
 * Localstorage is used to keep track of which view is chosen.
 */
export function GameProvider({ children }: { children: ReactNode }): ReactElement {
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