'use client';

import { createContext, type ReactElement, type ReactNode, useEffect, useState } from "react";
import { SearchFilter } from "../_types/types";
import { Game } from "../_db/schema/games";
import { getAllGamesRequest } from "../_client/client";
import { ALL_OPTION_VALUE } from "../_utils/utils";

export interface GamesContextProvider {
    games: Game[];
    filteredGames: Game[];
    filterGames: (filters: SearchFilter) => Game[];
    getGameByTitle: (title: string) => Game | undefined;
}

export const GamesContext = createContext<GamesContextProvider>({} as GamesContextProvider);

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
        let filteredGames = [...games];
        filteredGames = filters.developer !== ALL_OPTION_VALUE ? filteredGames.filter(game => game.developer === filters.developer) : filteredGames;
        filteredGames = filters.publisher !== ALL_OPTION_VALUE ? filteredGames.filter(game => game.publisher === filters.publisher) : filteredGames;
        filteredGames = filters.category !== ALL_OPTION_VALUE ? filteredGames.filter(game => game.category === filters.category) : filteredGames;

        const titleWords = filters.title.split(" ");
        for (let i = 0; i < titleWords.length; i++) {       // If search string consists of several words, title must include all words
            const word = titleWords[i].trim();
            filteredGames = word !== "" ? filteredGames.filter(game => game.title.toLowerCase().includes(word.toLowerCase())) : filteredGames;
        }

        setFilteredGames(filteredGames);
        return filteredGames;
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