import { Game } from '@/interfaces/interfaces';
import { AuthWeakPasswordError, createClient } from '@supabase/supabase-js';
import { createAuthClient } from "@/utils/supabase/server";

const databaseClient = createClient(databaseURL(), databaseKey());

function databaseURL() {
    return process.env.NEXT_PUBLIC_SUPABASE_URL as string;
}

function databaseKey() {
    return process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
}

const COVERS_STORAGE = "covers";
const GAMES_TABLE = "games";





/*********
 * GAMES *
 *********/

export async function updateGameById(game: Game, file: File) {
    const { error } = await databaseClient.storage.from(COVERS_STORAGE).upload(game.cover, file);
    if (error) {
        console.log(error);
    } else {
        console.log(`Uploaded file ${file} successfully`);
    }

    return await databaseClient.from(GAMES_TABLE).update(game).eq('id', game.id);
}

export async function getGames() {
    const { data, error } = await databaseClient.from(GAMES_TABLE).select();
    if (error) {
        console.log(error);
    } else {
        for (let i = 0; i < data.length; i++) {
            data[i].imageLink = getImageLink(data[i].cover);
        }
    }

    return data;
}

export async function getGameById(id: number) {
    const { data } = await databaseClient.from(GAMES_TABLE).select().eq('id', id).single();
    data.imageLink = getImageLink(data.cover);
    return data;
}

export function getImageLink(cover: string) {
    const { data } = databaseClient.storage.from(COVERS_STORAGE).getPublicUrl(cover);
    return data.publicUrl;
}




/*********
 * USERS *
 ********/

export async function signIn(email: string, password: string) {
    const authClient = await createAuthClient();

    const { data, error } = await authClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.log(error);
        throw new Error("Could not log in");
    }
}

export async function signUp(email: string, password: string) {
    const authClient = await createAuthClient();

    const { data, error } = await authClient.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        if (error instanceof AuthWeakPasswordError) {
            throw new Error('Password is to weak');
        }
        throw error;
    }
}