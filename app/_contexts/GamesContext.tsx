'use client';

import { createContext, type ReactElement, type ReactNode, useEffect, useState } from "react";
import { Game } from "../_types/types";
import { getGames } from "../_client/client";
import { ALL_OPTION_VALUE } from "../_utils/utils";

export interface GamesContextProvider {
    games: Game[];
}

export const GamesContext = createContext<GamesContextProvider>({} as GamesContextProvider);

/**
 * Applies chosen filters to the list of all playable games. The first selected filter type is marked because all other filter values should
 * be updated with how many games that matches the first selected filter type and the other filter 
 */
export function GamesProvider({ children }: { children: ReactNode }): ReactElement {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        loadGames();
    }, []);

    /**
     * Retrieve all games.
     */
    async function loadGames(): Promise<void> {
        try {
            const result = await getGames({category: ALL_OPTION_VALUE, developer: ALL_OPTION_VALUE, page: ALL_OPTION_VALUE, publisher: ALL_OPTION_VALUE, title: ""});
            setGames(result.games);
        } catch (error) {
            setGames([]);
        }
    }
    
    return (
        <GamesContext.Provider value={{ games }}>
            { children }
        </GamesContext.Provider>
    );
}