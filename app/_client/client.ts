import { FrequentlyAskedQuestion, Game, SearchResult, TimelineEvent, User, News, Filter } from '@/app/_types/types';


/********************************************************************************************
* This file contains functions that make API calls to the Route Handlers in the /api folder *
********************************************************************************************/


/**
 * Retrieve all games.
 */
export async function getAllGames(): Promise<SearchResult> {
    try {
        const response = await fetch("/api/games");
        if (response.ok) {
            const games = await response.json();
            return {games: games, count: games.length};
        }
    } catch (error) {
        console.error(error);
    }

    return {games: [], count: 0};
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
export async function updateFilterValues(values: string[], filter: Filter): Promise<void> {
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

/**
 * Send newsletter to all emails subscribed for receiving the newsletter.
 */
export async function sendNewsLetter(news: News): Promise<void> {
    try {
        await fetch(`/api/newsletter`, {
            method: "POST",
            body: JSON.stringify({ text: news.text, heading: news.heading })
        });
    } catch (error) {
        console.error(error);
    }
}