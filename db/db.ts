import { Account, Game, SearchFilter, SearchResult, Session, User } from '@/types/types';
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
const PROFILE_IMAGES_STORAGE = "catalog";

const GAMES_TABLE = "games";
const SESSION_TABLE = "sessions";
const USER_TABLE = "users";
const FAVOURITES_TABLE = "favourites";
const ACCOUNT_TABLE = "account";



/****************************************************************************************
* This file contains functions that interact directly with the database/database client *
****************************************************************************************/




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
        await uploadFile(game.cover, file, COVERS_STORAGE);
        await databaseClient.from(GAMES_TABLE).update({ cover: game.cover }).eq('id', game.id);     // Update game cover name
    } 
    
    const { cover, ...data } = game;             // Remove cover property since the cover is already taken care of (not updated if not changed)
    const { error } = await databaseClient.from(GAMES_TABLE).update(data).eq('id', game.id);
    if (error) {
        console.log(error);
    } else {
        console.log(`Updated game ${game.title} successfully`);
    }
}

export async function getGameById(id: number): Promise<Game> {
    const { data } = await databaseClient.from(GAMES_TABLE).select().eq('id', id).single();
    return data;
}





/*********
 * FILES *
 *********/

/**
 * Uploads file to storage (bucket). The file is stored in the supplied folder. If no folder name is supplied the file is stored in root.
 * If the file already exists (i.e., same name) at the destination, it is overwritten with the new file.
 */
async function uploadFile(fileName: string, file: File, storage: string, folder: string = ""): Promise<void> {
    const { error } = await databaseClient.storage.from(storage).upload(folder + fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
    if (error) {
        console.log(error);
    } else {
        console.log(`Uploaded file ${file} successfully`);
    }
}





/**********
 * SEARCH *
 **********/

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

    return { games: data, count: count ? count : 0 };
}

function from(page: number): number {
    return (page-1) * PAGINATION_PAGE_SIZE;
}

function to(page: number): number {
    return (page-1) * PAGINATION_PAGE_SIZE + PAGINATION_PAGE_SIZE - 1;
}







/******************
 * SEARCH FILTERS *
 ******************/

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

    return {games: data, count: count ? count : 0};
}

// Convert 'All' to % because the postgres function named 'games' uses % as wildcard (matches sequences of characters).
function convertFilterAll(value: string): string {
    return value === 'All' ? '%' : value;
}

/**
 * Retrieves all game developers by invoking a postgres function named 'developers'.
 */
export async function getAllDevelopers(): Promise<string[]> {
    return await invokePostgresFunction('developers');
}

/**
 * Retrieves all game publishers by invoking a postgres function named 'publishers'.
 */
export async function getAllPublishers(): Promise<string[]> {
    return await invokePostgresFunction('publishers');
}

async function invokePostgresFunction(functionName: string): Promise<string[]> {
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

/**
 * Creates a user in the user table and returns the newly created user. Emails are unique so an error will be thrown in case the
 * email already exists in the user table.
 */
export async function registerUser(email: string, password_hash: string): Promise<{id: number, email: string}> {
    const { data, error } = await databaseClient.from(USER_TABLE).insert({email, password_hash}).select('id, email').single();
    
    if (error) {
        console.log(error);
        if (error instanceof AuthWeakPasswordError) {
            throw new Error('Password is to weak');
        } else if (error.code == '23505') {
            throw new Error(`The email ${email} is already in use`);
        }
        throw error;
    }

    return data;
}

export async function getUserByEmail(email: string): Promise<User> {
    const { data, error } = await databaseClient.from(USER_TABLE).select(USER_COLUMNS).eq('email', email).single();
    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export async function getUserById(id: number): Promise<User> {
    const { data, error } = await databaseClient.from(USER_TABLE).select(USER_COLUMNS).eq('id', id).single();
    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export async function updateUser(id: number, password_hash: string, last_name: string, first_name: string): Promise<void> {
    await databaseClient.from(USER_TABLE).update({password_hash, last_name, first_name}).eq('id', id);
}

export async function updateUserBio(id: number, bio: string): Promise<void> {
    await databaseClient.from(USER_TABLE).update({bio}).eq('id', id);
}

// Updates the name of the image used as a profile image. This image name is used to reference the image file stored in a bucket somewhere else.
async function updateUserImage(id: number, image: string): Promise<void> {
    await databaseClient.from(USER_TABLE).update({image}).eq('id', id);
}

/**
 * The profile image is stored in a folder named as the user's id.
 */
export async function updateProfileImage(id: number, image: File): Promise<void> {
    await uploadFile(image.name, image, PROFILE_IMAGES_STORAGE, id.toString() + "/");   // uploads the image file to a bucket.
    await updateUserImage(id, image.name);  // updates the image name since this name is used to reference the uploaded image file.
}






/***********
 * SESSION *
 ***********/

/**
 * Creates a session when a user register or signs in.
 */
export async function storeSession(session: Session): Promise<void> {
    await databaseClient.from(SESSION_TABLE).insert(session);
}

export async function getSessionByTokenValue(value: string): Promise<Session> {
    const { data, error } = await databaseClient.from(SESSION_TABLE).select('expires_at, user_id, token_value').eq('token_value', value).single();
    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

/**
 * Deletes a user's session when the user signs out.
 */
export async function deleteSessionByTokenValue(token_value: string): Promise<void> {
    await databaseClient.from(SESSION_TABLE).delete().eq('token_value', token_value);
}

/**
 * The session is usually updated when it is refreshed (so it does not expire).
 */
export async function updateSession(session: Session): Promise<void> {
    await databaseClient.from(SESSION_TABLE).update(session);
}






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







/***********
 * ACCOUNT *
 ***********/

export async function createAccount(user_id: number, activation_code: string): Promise<void> {
    await databaseClient.from(ACCOUNT_TABLE).insert({ user_id, activation_code });
}

/**
 * Copies the default profile image to the folder created for the newly registered user. The folder is named
 * after the registered user's id.
 */
export async function copyProfileImageToFolder(activation_code: string): Promise<void> {
    try {
        const response = await databaseClient.from(ACCOUNT_TABLE).select().eq('activation_code', activation_code).single();
        await databaseClient.storage.from(PROFILE_IMAGES_STORAGE).copy('profile.png', `${response.data?.user_id}/profile.png`);
    } catch (error) {
        console.log(error);
    }
}

export async function getAccountByUserId(user_id: number): Promise<Account> {
    const { data, error } = await databaseClient.from(ACCOUNT_TABLE).select().eq('user_id', user_id).single();
    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

/**
 * First a check is done to see if the activation code is valid. Then the corresponding account is activated.
 */
export async function activateAccount(activation_code: string): Promise<boolean> {
    const { data, error } = await databaseClient.from(ACCOUNT_TABLE).select().eq('activation_code', activation_code).eq('activated', false);
    if (error || data.length === 0) {
        return false;
    }

    await databaseClient.from(ACCOUNT_TABLE).update({activated: true}).eq('activation_code', activation_code);    
    return true;
}