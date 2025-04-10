import { Game, SearchFilter, SearchResult } from '@/types/types';


/********************************************************************************************
* This file contains functions that make API calls to the Route Handlers in the /api folder *
********************************************************************************************/


/**
 * Retrieve games that match the search filters.
 */
export async function getGames(filters: SearchFilter): Promise<SearchResult> {
    try {
        const response = await fetch(`/api/games?title=${filters.title.trim()}&category=${filters.category}&developer=${filters.developer}&publisher=${filters.publisher}&page=${filters.page}`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }

    return {games: [], count: 0};
}

/**
 * Retrieve favourite games for user with an active session.
 */
export async function getFavourites(): Promise<Game[]> {
    try {
        const response = await fetch(`/api/favourites`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }

    return [];
}

/**
 * Persist a favourite game in the database for user with an active session.
 */
export async function addFavouriteGameToDatabase(game_id: number): Promise<void> {
    try {
        await fetch(`/api/favourites`, {
            method: "POST",
            body: JSON.stringify({ game_id: game_id })
        });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Delete a favourite game in the database for user with an active session.
 */
export async function deleteFavouriteGameFromDatabase(game_id: number): Promise<void> {
    try {
        await fetch(`/api/favourites`, {
            method: "DELETE",
            body: JSON.stringify({ game_id: game_id })
        });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Updates the list of values for a supplied search filter (e.g., categories, developers, publishers).
 */
export async function updateFilterValues(values: string[], filter: string) {
    try {
        await fetch(`/api/filter`, {
            method: "PUT",
            body: JSON.stringify({ values: values, filter: filter })
        });
    } catch (error) {
        console.error(error);
    }
}