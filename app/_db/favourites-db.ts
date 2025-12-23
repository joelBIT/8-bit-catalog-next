import 'server-only';

import { databaseClient, FAVOURITES_TABLE, GAMES_TABLE } from './db';
import { Game } from '../_types/types';




/**************
 * FAVOURITES *
 **************/

/**
 * Returns a user's favourite games. First all game id's of the favourite games are gathered. Then all game objects with
 * the corresponding id's are returned.
 */
export async function getFavouritesByUserId(user_id: number): Promise<Game[]> {
    const { data, error } = await databaseClient.from(FAVOURITES_TABLE).select("game_id").eq('user_id', user_id);
    if (error) {
        console.log(error);
    }

    if (data) {
        const ids = data.map(game => game.game_id);
        const response = await databaseClient.from(GAMES_TABLE).select().in("id", ids);

        if (response.data) {
            return response.data;
        }
    }

    return [];
}

export async function addFavouriteForUserId(user_id: number, game_id: number): Promise<void> {
    await databaseClient.from(FAVOURITES_TABLE).insert({user_id, game_id});
}

export async function deleteFavouriteForUserId(user_id: number, game_id: number): Promise<void> {
    await databaseClient.from(FAVOURITES_TABLE).delete().eq("user_id", user_id).eq("game_id", game_id);
}