import 'server-only';

import { asc, eq } from 'drizzle-orm';
import { Game } from '../_types/types';
import { databaseClient } from './db';
import { uploadFile } from './files-db';
import { gamesTable } from './schema/games';




/**
 * Updates an existing game. If a new cover has been chosen it is uploaded to a storage bucket. After that the
 * cover name is updated for the game in the database since this cover name is used to reference the
 * cover image in the storage bucket.
 */
export async function updateGameById(game: Game, file: File): Promise<void> {
    if (file.name !== 'undefined') {                            // New game cover was chosen so the cover file must be uploaded to the storage bucket
        await uploadFile(game.cover, file);
        await databaseClient.update(gamesTable).set({ cover: game.cover }).where(eq(gamesTable.id, game.id));     // Update game cover name
    } 
    
    const { cover, ...data } = game;             // Remove cover property since the cover is already taken care of (not updated if not changed)
    console.log(`cover ${cover} not updated`);
    await databaseClient.update(gamesTable).set(data).where(eq(gamesTable.id, game.id));
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