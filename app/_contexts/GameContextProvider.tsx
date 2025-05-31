'use client';

import { createContext, ReactElement, useState } from "react";
import { ContextProviderChildren, GamesContextProvider } from "@/app/_interfaces/interfaces";
import { Game } from "@/app/_types/types";
import { useSearchParams } from "next/navigation";

export const GameContext = createContext<GamesContextProvider>({} as GamesContextProvider);

/**
 * Localstorage is used to keep track of which view is chosen.
 */
export function GameContextProvider({ children }: ContextProviderChildren): ReactElement {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const listView = params.get('listView') as string;
    const [ selectedGame, setSelectedGame ] = useState<Game>({} as Game);
    const [ gridView, setGridView ] = useState<boolean>(listView ? false : true);              // The chosen list view for game lists

    function toggleGridView(): void {
        params.delete('listView');
        params.set('listView', gridView ? "true" : "false");
        window.history.pushState(null, '', `?${params.toString()}`);        // Remove 'show' so no modal is active when changing games list view
        setGridView(!gridView);
    }

    return (
        <GameContext.Provider value={{ selectedGame, setSelectedGame, gridView, toggleGridView }}>
            { children }
        </GameContext.Provider>
    );
}