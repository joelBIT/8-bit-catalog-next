import { SearchResult, TimelineEvent, User, Filter } from '@/app/_types/types';
import { Address } from '../_db/schema/addresses';
import { FrequentlyAskedQuestion } from '../_db/schema/faqs';
import { Game } from '../_db/schema/games';
import { News } from '../_db/schema/news';
import { Profile } from '../_db/schema/profiles';


/********************************************************************************************
* This file contains functions that make API calls to the Route Handlers in the /api folder *
********************************************************************************************/


/**
 * Retrieve all games.
 */
export async function getAllGamesRequest(): Promise<SearchResult> {
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
export async function getUsersRequest(): Promise<User[]> {
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
 * Retrieve profile for supplied user ID.
 */
export async function getProfileByUserIdRequest(user_id: number): Promise<Profile> {
    try {
        const response = await fetch(`/api/profile?user_id=${user_id}`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error(error);
        throw error;
    }

    throw new Error(`Could not find profile for user id ${user_id}`);
}

export async function getAddressByUserIdRequest(user_id: number): Promise<Address> {
    try {
        const response = await fetch(`/api/address?user_id=${user_id}`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error(error);
        throw error;
    }

    throw new Error(`Could not find address for user id ${user_id}`);
}

/**
 * Retrieve favourite games for user with an active session.
 */
export async function getFavouritesRequest(): Promise<Game[]> {
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
export async function addFavouriteGameToDatabaseRequest(game_id: number): Promise<void> {
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
export async function deleteFavouriteGameFromDatabaseRequest(game_id: number): Promise<void> {
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
export async function updateFilterValuesRequest(values: string[], filter: Filter): Promise<void> {
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
export async function getTimelineEventsRequest(): Promise<TimelineEvent[]> {
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
export async function getFAQsRequest(): Promise<FrequentlyAskedQuestion[]> {
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
export async function sendNewsLetterRequest(news: News): Promise<void> {
    try {
        await fetch(`/api/newsletter`, {
            method: "POST",
            body: JSON.stringify({ text: news.text, heading: news.heading })
        });
    } catch (error) {
        console.error(error);
    }
}