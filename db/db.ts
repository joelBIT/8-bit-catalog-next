import { Game } from '@/interfaces/interfaces';
import { createClient } from '@supabase/supabase-js';

const databaseClient = createClient(databaseURL(), databaseKey());

function databaseURL() {
    return process.env.SUPABASE_URL as string;
}

function databaseKey() {
    return process.env.SUPABASE_ANON_KEY as string;
}

export async function updateGameById(game: Game, file: File) {
    const { error } = await databaseClient.storage.from('covers').upload(game.cover, file);
    if (error) {
        console.log(error);
    } else {
        console.log(`Uploaded file ${file} successfully`);
    }

    return await databaseClient.from('games').update(game).eq('id', game.id);
}

export async function getGames() {
    const { data, error } = await databaseClient.from('games').select();
    if (error) {
        console.log(error);
    } else {
        for (let i = 0; i < data.length; i++) {
            data[i].imageLink = await getImageLink(data[i].cover);
        }
    }

    return data;
}

export async function getGameById(id: number) {
    const { data } = await databaseClient.from('games').select().eq('id', id).single();
    data.imageLink = await getImageLink(data.cover);
    return data;
}

export async function getImageLink(cover: string) {
    const { data } = databaseClient.storage.from('covers').getPublicUrl(cover);
    return data.publicUrl;
}