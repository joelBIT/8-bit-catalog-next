'use client';

import { createContext, type ReactElement, type ReactNode, useEffect, useState } from "react";
import { SearchFilter } from "../_types/types";
import { Game } from "../_db/schema/games";
import { getAllGamesRequest } from "../_client/client";
import { ALL_OPTION_VALUE } from "../_utils/utils";

export interface GamesContextProvider {
    filteredGames: Game[];
    isLoading: boolean;
    loadError: boolean;
    reloadGames: () => void;
    filterGames: (filters: SearchFilter) => Game[];
    getGameByTitle: (title: string) => Game | undefined;
}

export const GamesContext = createContext<GamesContextProvider | undefined>(undefined);

/**
 * Performs actions related to games (filtering, etc).
 */
export function GamesProvider({ children }: { children: ReactNode }): ReactElement {
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);      // true until the first request has finished
    const [loadError, setLoadError] = useState<boolean>(false);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);     // Filtered games are stored to facilitate scroll positions in lists when navigating

    useEffect(() => {
        fetchGames();
    }, []);

    /**
     * Retrieve all games.
     */
    async function fetchGames(): Promise<void> {
        const result = await getAllGamesRequest();

        if (result) {
            setGames(result.games);
            setLoadError(false);
        } else {
            setLoadError(true);
        }
        
        setIsLoading(false);
    }

    /** 
     * Used by the "Try again" button. 
     */
    function reloadGames(): void {
        setIsLoading(true);
        setLoadError(false);
        fetchGames();
    }

    /**
     * Applies chosen filters to the list of all playable games. The first selected filter type is marked because all other filter values should
     * be updated with how many games that matches the first selected filter type and the other filter.
     */
    function filterGames(filters: SearchFilter): Game[] {
        let result = [...games];
        if (!isAll(filters.developer)) result = result.filter(game => game.developer.toLowerCase() === filters.developer.toLowerCase());
        if (!isAll(filters.publisher)) result = result.filter(game => game.publisher.toLowerCase() === filters.publisher.toLowerCase());
        if (!isAll(filters.category)) result = result.filter(game => game.category.toLowerCase() === filters.category.toLowerCase());

        for (const word of filters.title.split(" ").map(w => w.trim()).filter(Boolean)) {
            result = result.filter(game => game.title.toLowerCase().includes(word.toLowerCase()));
        }

        setFilteredGames(result);
        return result;
    }

    const isAll = (value: string | null | undefined): boolean => !value || value === ALL_OPTION_VALUE || value === ALL_OPTION_VALUE.toLowerCase();

    function getGameByTitle(title: string): Game | undefined {
        return games.find(game => game.title === title);
    }

    return (
        <GamesContext.Provider value={{ filteredGames, isLoading, loadError, reloadGames, filterGames, getGameByTitle }}>
            { children }
        </GamesContext.Provider>
    );
}