import { Game, SearchFilter, SearchResult, Session, User } from '@/types/types';
import { AuthWeakPasswordError, createClient } from '@supabase/supabase-js';
import { ALL_OPTION_VALUE, PAGINATION_PAGE_SIZE } from '@/utils/utils';

const databaseClient = createClient(databaseURL(), databaseKey());

function databaseURL() {
    return process.env?.SUPABASE_URL as string;
}

function databaseKey() {
    return process.env?.SUPABASE_KEY as string;
}

const COVERS_STORAGE = "covers";
const GAMES_TABLE = "games";
const SESSION_TABLE = "sessions";
const USER_TABLE = "users";
const FAVOURITES_TABLE = "favourites";





/*********
 * GAMES *
 *********/

export async function updateGameById(game: Game, file: File) {
    if (file.name === 'undefined') {                            // No new cover was chosen for the game
        const { cover, imageLink, ...data } = game;             // Remove cover property since the cover is not updated
        return await databaseClient.from(GAMES_TABLE).update(data).eq('id', game.id);
    }

    await uploadFile(game.cover, file);

    return await databaseClient.from(GAMES_TABLE).update(game).eq('id', game.id);
}

/**
 * Uploads file to storage
 */
async function uploadFile(fileName: string, file: File) {
    const { error } = await databaseClient.storage.from(COVERS_STORAGE).upload(fileName, file);
    if (error) {
        console.log(error);
    } else {
        console.log(`Uploaded file ${file} successfully`);
    }
}

/**
 * Retrieve games based on supplied search filters. A count property corresponding to the number of matched games is added to the response.
 */
export async function filterSearch(filters: SearchFilter): Promise<SearchResult> {
    const { data, error, count } = await databaseClient.rpc('games', {
        filter_title: '%' + filters.title + '%', 
        filter_category: convertFilterAll(filters.category), 
        filter_developer: convertFilterAll(filters.developer),
        filter_publisher: convertFilterAll(filters.publisher)},
        {count: 'exact'})
        .range(from(parseInt(filters.page)), to(parseInt(filters.page)));

    if (error) {
        console.log(error);
        return {games: [], count: 0};
    }

    for (let i = 0; i < data.length; i++) {
        data[i].imageLink = getImageLink(data[i].cover);    // Adds image link to games so that a user can click on the cover image to open it in another tab
    }

    return {games: data, count: count ? count : 0};
}

function convertFilterAll(value: string) {
    return value === 'All' ? '%' : value;
}

/**
 * Performs a text search if a title is given by the user. Otherwise a search is executed based on supplied filters.
 */
export async function getGamesBySearchFilters(filters: SearchFilter): Promise<SearchResult> {
    if (filters.title) {
        return await textSearch(filters);
    }
    
    return await filterSearch(filters);
}

/**
 * Retrieve games based on text search performed on game descriptions. 
 * A count property corresponding to the number of matched games is added to the response.
 */
export async function textSearch(filters: SearchFilter): Promise<SearchResult> {
    let query = databaseClient.from(GAMES_TABLE).select('*', { count: 'exact' });

    if (filters.developer !== ALL_OPTION_VALUE) {
        query = query.eq('developer', filters.developer);
    }
    if (filters.category !== ALL_OPTION_VALUE) {
        query = query.eq('category', filters.category);
    }
    if (filters.publisher !== ALL_OPTION_VALUE) {
        query = query.eq('publisher', filters.publisher);
    }

    const { data, error, count } = await query.textSearch('description', `${filters.title.replaceAll(' ', ' & ')}`)
    .range(from(parseInt(filters.page)), to(parseInt(filters.page)));

    if (error) {
        console.log(error);
        return {games: [], count: 0};
    }

    for (let i = 0; i < data.length; i++) {
        data[i].imageLink = getImageLink(data[i].cover);    // Adds image link to games so that a user can click on the cover image to open it in another tab
    }

    return { games: data, count: count ? count : 0 };
}

function from(page: number): number {
    return (page-1) * PAGINATION_PAGE_SIZE;
}

function to(page: number): number {
    return (page-1) * PAGINATION_PAGE_SIZE + PAGINATION_PAGE_SIZE - 1;
}

function getImageLink(cover: string) {
    const { data } = databaseClient.storage.from(COVERS_STORAGE).getPublicUrl(cover);
    return data.publicUrl;
}

export async function getGameById(id: number) {
    const { data } = await databaseClient.from(GAMES_TABLE).select().eq('id', id).single();
    data.imageLink = getImageLink(data.cover);
    return data;
}




/******************
 * SEARCH FILTERS *
 ******************/

export async function getAllDevelopers() {
    return await invokePostgresFunction('developers');
}

export async function getAllPublishers() {
    return await invokePostgresFunction('publishers');
}

async function invokePostgresFunction(functionName: string) {
    const { data, error } = await databaseClient.rpc(functionName);         // Invokes the named Postgres function
    if (error) {
        console.log(error);
        return []; 
    }

    return data; 
}




/*********
 * USERS *
 *********/

const USER_COLUMNS = "id, password_hash, role, last_name, first_name, email, bio, image";

export async function registerUser(email: string, password_hash: string) {
    const { data, error } = await databaseClient.from(USER_TABLE).insert({email, password_hash}).select('id, email').single();
    if (error) {
        console.log(error);
        if (error instanceof AuthWeakPasswordError) {
            throw new Error('Password is to weak');
        }
        throw error;
    }

    return data;
}

export async function getUserByEmail(email: string) {
    return await databaseClient.from(USER_TABLE).select(USER_COLUMNS).eq('email', email).single();
}

export async function getUserById(id: number) {
    return await databaseClient.from(USER_TABLE).select(USER_COLUMNS).eq('id', id).single();
}

export async function updateUser(id: number, password_hash: string, last_name: string, first_name: string) {
    return await databaseClient.from(USER_TABLE).update({password_hash, last_name, first_name}).eq('id', id);
}







/***********
 * SESSION *
 ***********/

/**
 * Creates a session when a user register or signs in.
 */
export async function storeSession(session: Session) {
    return await databaseClient.from(SESSION_TABLE).insert(session);
}

export async function getSessionByTokenValue(value: string){
    const { data, error } = await databaseClient.from(SESSION_TABLE).select('expires_at, user_id, token_value').eq('token_value', value).single();
    if (error) {
        console.log(error);
    }
    return data;
}

/**
 * Deletes a user's session when the user signs out.
 */
export async function deleteSessionByTokenValue(token_value: string) {
    return await databaseClient.from(SESSION_TABLE).delete().eq('token_value', token_value);
}

/**
 * The session is usually updated when it is refreshed (so it does not expire).
 */
export async function updateSession(session: Session) {
    return await databaseClient.from(SESSION_TABLE).update(session);
}






/**************
 * FAVOURITES *
 **************/

export async function getFavouritesByUserId(user_id: number): Promise<Game[]> {
    const { data, error } = await databaseClient.from(FAVOURITES_TABLE).select("game_id").eq('user_id', user_id);
    if (error) {
        console.log(error);
    }

    if (data) {
        const ids = data.map(game => game.game_id);
        const response = await databaseClient.from(GAMES_TABLE).select().in("id", ids);

        if (response.data) {
            const games = response.data;
            for (let i = 0; i < data.length; i++) {
                games[i].imageLink = getImageLink(games[i].cover);    // Adds image link to games so that a user can click on the cover image to open it in another tab
            }
            return games;
        }
    }

    return [];
}

export async function addFavouriteForUserId(user_id: number, game_id: number) {
    await databaseClient.from(FAVOURITES_TABLE).insert({user_id, game_id});
}

export async function deleteFavouriteForUserId(user_id: number, game_id: number) {
    await databaseClient.from(FAVOURITES_TABLE).delete().eq("user_id", user_id).eq("game_id", game_id);
}