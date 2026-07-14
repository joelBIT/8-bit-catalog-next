import 'server-only';

import { asc, eq } from 'drizzle-orm';
import { databaseClient } from './db';
import { uploadFile } from './files-db';
import { Game, gamesTable, InsertGame } from './schema/games';




/**
 * Updates an existing game. If a new cover has been chosen it is uploaded to a storage bucket. After that the
 * cover name is updated for the game in the database since this cover name is used to reference the
 * cover image in the storage bucket.
 */
export async function updateGameById(gameId: number, game: InsertGame, file: File): Promise<void> {
    if (file.name !== 'undefined') {                            // New game cover was chosen so the cover file must be uploaded to the storage bucket
        await uploadFile(file);
        await databaseClient
            .update(gamesTable)
            .set({ cover: game.cover })
            .where(eq(gamesTable.id, gameId));     // Update game cover name
    } 
    
    const { cover, ...data } = game;             // Remove cover property since the cover is already taken care of (not updated if not changed)
    console.log(`cover ${cover} not updated`);
    await databaseClient
        .update(gamesTable)
        .set(data)
        .where(eq(gamesTable.id, gameId));
    console.log(`Updated game ${game.title} successfully`);
}

/**
 * Retrieve all game titles.
 */
export async function getAllTitles(): Promise<string[]> {
    const response = await databaseClient.select({"title": gamesTable.title}).from(gamesTable);
    if (response) {
        const titles = response.map(title => title.title);
        titles.sort();
        return titles;
    }

    return [];
}

/**
 * Retrieve metadata for all games and sort the list by title in ascending order.
 */
export async function getAllGames(): Promise<Game[]> {
    return await databaseClient.select().from(gamesTable).orderBy(asc(gamesTable.title));
}

/**
 * Retrieves all game categories.
 */
export async function getAllCategories(): Promise<string[]> {
    try {
        const uniqueCategories = (await databaseClient
            .selectDistinct({ category: gamesTable.category })
            .from(gamesTable)
            .orderBy(gamesTable.category));
        return uniqueCategories.map(object => object.category);
    } catch (error) {
        console.log(error);
        return [];
    }
}

/**
 * Retrieves all game developers.
 */
export async function getAllDevelopers(): Promise<string[]> {
    try {
        const uniqueDevelopers = (await databaseClient
            .selectDistinct({ developer: gamesTable.developer })
            .from(gamesTable)
            .orderBy(gamesTable.developer));
        return uniqueDevelopers.map(object => object.developer);
    } catch (error) {
        console.log(error);
        return [];
    }
}

/**
 * Retrieves all game publishers.
 */
export async function getAllPublishers(): Promise<string[]> {
    try {
        const uniquePublishers = (await databaseClient
            .selectDistinct({ publisher: gamesTable.publisher })
            .from(gamesTable)
            .orderBy(gamesTable.publisher));
        return uniquePublishers.map(object => object.publisher);
    } catch (error) {
        console.log(error);
        return [];
    }
}