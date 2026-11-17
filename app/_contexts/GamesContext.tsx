'use client';

import { createContext, type ReactElement, type ReactNode, useEffect, useState } from "react";
import { SearchFilter } from "../_types/types";
import { Game } from "../_db/schema/games";
import { getAllGamesRequest } from "../_client/client";
import { ALL_OPTION_VALUE } from "../_utils/utils";

export interface GamesContextProvider {         // TODO: expose a isLoading so that SearchResult can show suitable message
    games: Game[];
    filteredGames: Game[];
    filterGames: (filters: SearchFilter) => Game[];
    getGameByTitle: (title: string) => Game | undefined;
}

export const GamesContext = createContext<GamesContextProvider | undefined>(undefined);

/**
 * Performs actions related to games (filtering, etc).
 */
export function GamesProvider({ children }: { children: ReactNode }): ReactElement {
    const [games, setGames] = useState<Game[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);     // Filtered games are stored to facilitate scroll positions in lists when navigating

    useEffect(() => {
        loadGames();
    }, []);

    /**
     * Retrieve all games. Store games in local storage if available.
     */
    async function loadGames(): Promise<void> {
        try {
            const result = await getAllGamesRequest();
            setGames(result.games);
        } catch (error) {
            setGames([]);
        }
    }

    /**
     * Applies chosen filters to the list of all playable games. The first selected filter type is marked because all other filter values should
     * be updated with how many games that matches the first selected filter type and the other filter.
     */
    function filterGames(filters: SearchFilter): Game[] {
        let result = [...games];
        result = filters.developer !== ALL_OPTION_VALUE ? result.filter(game => game.developer === filters.developer) : result;
        result = filters.publisher !== ALL_OPTION_VALUE ? result.filter(game => game.publisher === filters.publisher) : result;
        result = filters.category !== ALL_OPTION_VALUE ? result.filter(game => game.category === filters.category) : result;

        for (const word of filters.title.split(" ").map(w => w.trim()).filter(Boolean)) {
            result = result.filter(game => game.title.toLowerCase().includes(word.toLowerCase()));
        }

        setFilteredGames(result);
        return result;
    }

    function getGameByTitle(title: string): Game | undefined {
        return games.find(game => game.title === title);
    }

    return (
        <GamesContext.Provider value={{ games, filteredGames, filterGames, getGameByTitle }}>
            { children }
        </GamesContext.Provider>
    );
}