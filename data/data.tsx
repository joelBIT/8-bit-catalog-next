import { SearchFilter, SearchResult } from '@/types/types';

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
export async function getFavourites() {
    try {
        const response = await fetch(`/api/favourites`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function addFavouriteGameToDatabase(game_id: number) {
    try {
        await fetch(`/api/favourites`, {
            method: "POST",
            body: JSON.stringify({ game_id: game_id })
        });
    } catch (error) {
        console.error(error);
    }
}

export async function deleteFavouriteGameFromDatabase(game_id: number) {
    try {
        await fetch(`/api/favourites`, {
            method: "DELETE",
            body: JSON.stringify({ game_id: game_id })
        });
    } catch (error) {
        console.error(error);
    }
}