import 'server-only';

import { Game } from '../_types/types';
import { databaseClient, GAMES_TABLE } from './db';
import { uploadFile } from './files-db';


/*********
 * GAMES *
 *********/

/**
 * Updates an existing game. If a new cover has been chosen it is uploaded to a storage bucket. After that the
 * cover name is updated for the game in the database since this cover name is used to reference the
 * cover image in the storage bucket.
 */
export async function updateGameById(game: Game, file: File): Promise<void> {
    if (file.name !== 'undefined') {                            // New game cover was chosen so the cover file must be uploaded to the storage bucket
        await uploadFile(game.cover, file);
        await databaseClient.from(GAMES_TABLE).update({ cover: game.cover }).eq('id', game.id);     // Update game cover name
    } 
    
    const { cover, ...data } = game;             // Remove cover property since the cover is already taken care of (not updated if not changed)
    console.log(`cover ${cover} not updated`);
    const { error } = await databaseClient.from(GAMES_TABLE).update(data).eq('id', game.id);
    if (error) {
        console.log(error);
    } else {
        console.log(`Updated game ${game.title} successfully`);
    }
}

export async function getAllTitles(): Promise<string[]> {
    const { data } = await databaseClient.from(GAMES_TABLE).select("title");
    if (data) {
        const titles = data.map(title => title.title);
        titles.sort();
        return titles;
    }

    return [];
}

export async function getAllGames(): Promise<Game[]> {
    const { data } = await databaseClient.from(GAMES_TABLE).select().order("title", {ascending: true});
    if (data) {
        return data;
    }

    return [];
}





