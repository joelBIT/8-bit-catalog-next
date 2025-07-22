import { FilterValues, FrequentlyAskedQuestion, Game, SearchFilter, SearchResult, TimelineEvent, User, News } from '@/app/_types/types';


/********************************************************************************************
* This file contains functions that make API calls to the Route Handlers in the /api folder *
********************************************************************************************/


/**
 * Retrieve games that match the search filters.
 */
export async function getGames(filters: SearchFilter): Promise<SearchResult> {
    try {
        const response = await fetch(`/api/games?title=${filters.title.trim()}&category=${filters.category}&developer=${filters.developer}&publisher=${filters.publisher}&page=${filters.page}`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error(error);
    }

    return {games: [], count: 0};
}

export async function getGameByTitle(title: string): Promise<Game> {
    try {
        const response = await fetch(`/api/game?title=${title}`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error(error);
    }

    return {} as Game;
}

/**
 * Retrieve all users.
 */
export async function getUsers(): Promise<User[]> {
    try {
        const response = await fetch(`/api/users`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error(error);
    }

    return [];
}

/**
 * Retrieve favourite games for user with an active session.
 */
export async function getFavourites(): Promise<Game[]> {
    try {
        const response = await fetch(`/api/favourites`);
        if (response.ok) {
            return await response.json();
        }
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
export async function updateFilterValues(values: string[], filter: string): Promise<void> {
    try {
        await fetch(`/api/filter`, {
            method: "PUT",
            body: JSON.stringify({ values: values, filter: filter })
        });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Retrieve all existing filter (categories, developers, publishers) values. Used in, e.g., search or editing a game.
 */
export async function getFilterValues(): Promise<FilterValues> {
    try {
        const response = await fetch(`/api/filters`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error(error);
    }

    return { developers: [], publishers: [], categories: []};
}

/**
 * Retrieve the timeline for about page.
 */
export async function getTimelineEvents(): Promise<TimelineEvent[]> {
    try {
        const response = await fetch(`/api/timeline`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error(error);
    }

    return [];
}

/**
 * Retrieve the FAQs for the FAQ page.
 */
export async function getFAQs(): Promise<FrequentlyAskedQuestion[]> {
    try {
        const response = await fetch(`/api/faq`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error(error);
    }

    return [];
}