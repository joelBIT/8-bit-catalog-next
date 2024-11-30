import { Game } from '@/interfaces/interfaces';
import { createClient } from '@supabase/supabase-js';

const databaseClient = createClient(databaseURL(), databaseKey());

function databaseURL() {
    return process.env.SUPABASE_URL as string;
}

function databaseKey() {
    return process.env.SUPABASE_KEY as string;
}

export async function updateGameById(game: Game) {
    const { error } = await databaseClient.storage.from('covers').upload(game.cover, game.image);
    if (error) {
        console.log(error);
    } else {
        console.log(`Uploaded file ${game.image} successfully`);
    }

    return await databaseClient.from('games').update(game).eq('id', game.id);
}

export async function getGames() {
    return await databaseClient.from('games').select();
}

export async function getGameById(id: number) {
    return await databaseClient.from('games').select().eq('id', id).single();
}