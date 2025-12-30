import 'server-only';

import { and, eq, inArray } from 'drizzle-orm';
import { databaseClient } from './db';
import { Game } from '../_types/types';
import { favouritesTable } from './schema/favourites';
import { gamesTable } from './schema/games';





/**
 * Returns a user's favourite games. First all game id's of the favourite games are gathered. Then all game objects with
 * the corresponding id's are returned.
 */
export async function getFavouritesByUserId(userId: number): Promise<Game[]> {
    const response = await databaseClient.select().from(favouritesTable).where(eq(favouritesTable.userId, userId));

    if (response) {
        const ids = response.map((game: { gameId: number; }) => game.gameId);
        return await databaseClient.select().from(gamesTable).where(inArray(gamesTable.id, ids));
    }

    return [];
}

/**
 * Store the supplied game ID as a favourite game for user with supplied user ID.
 */
export async function addFavouriteForUserId(userId: number, gameId: number): Promise<void> {
    await databaseClient.insert(favouritesTable).values({userId, gameId});
}

/**
 * Delete the supplied game ID from list of favourite games for user with supplied user ID.
 */
export async function deleteFavouriteForUserId(userId: number, gameId: number): Promise<void> {
    await databaseClient.delete(favouritesTable).where(and(eq(favouritesTable.userId, userId), eq(favouritesTable.gameId, gameId)));
}