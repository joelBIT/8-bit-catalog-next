import { Game } from '@/interfaces/interfaces';
import { createClient } from '@supabase/supabase-js';

const databaseClient = createClient(databaseURL(), databaseKey());

function databaseURL() {
    return process.env.NEXT_PUBLIC_SUPABASE_URL as string;
}

function databaseKey() {
    return process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
}

export async function updateGameById(game: Game) {
    return await databaseClient.from('games').update(game).eq('id', game.id);
}