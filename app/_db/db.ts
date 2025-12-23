import 'server-only';

import { Account, Game, Session, User, Profile, Address } from '@/app/_types/types';
import { AuthWeakPasswordError, createClient } from '@supabase/supabase-js';
import { uploadFile } from './files-db';

export const databaseClient = createClient(databaseURL(), databaseKey());

function databaseURL() {
    return process.env?.SUPABASE_URL as string;
}

function databaseKey() {
    return process.env?.SUPABASE_KEY as string;
}

const PROFILE_IMAGES_STORAGE = "catalog";

const ACCOUNTS_TABLE = "accounts";
const ADDRESS_TABLE = "address";
export const ARTICLES_TABLE = "articles"
const FAVOURITES_TABLE = "favourites";
export const FAQ_TABLE = "faq";
const FILTERS_TABLE = "filters";
export const GAMES_TABLE = "games";
export const NEWS_TABLE = "news";
export const NEWSLETTER_TABLE = "newsletter";
const PROFILES_TABLE = "profiles";
const SESSION_TABLE = "sessions";
export const TIMELINE_TABLE = "timeline";
const USERS_TABLE = "users";




/****************************************************************************************
* This file contains functions that interact directly with the database/database client *
****************************************************************************************/








/******************
 * SEARCH FILTERS *
 ******************/

/**
 * Retrieves all game categories.
 */
export async function getAllCategories(): Promise<string[]> {
    const { error, data } = await databaseClient.from(FILTERS_TABLE).select('categories').single();
    if (error) {
        console.log(error);
        return [];
    }

    return data.categories;
}

/**
 * Retrieves all game developers.
 */
export async function getAllDevelopers(): Promise<string[]> {
    const { error, data } = await databaseClient.from(FILTERS_TABLE).select('developers').single();
    if (error) {
        console.log(error);
        return [];
    }

    return data.developers;
}

/**
 * Retrieves all game publishers.
 */
export async function getAllPublishers(): Promise<string[]> {
    const { error, data } = await databaseClient.from(FILTERS_TABLE).select('publishers').single();
    if (error) {
        console.log(error);
        return [];
    }

    return data.publishers;
}

/**
 * Updates the Category search-filter values.
 */
export async function updateCategoryFilter(values: string[]): Promise<void> {
    await databaseClient.from(FILTERS_TABLE).update({ categories: values }).eq('id', 1);
}

/**
 * Updates the Publisher search-filter values.
 */
export async function updatePublisherFilter(values: string[]): Promise<void> {
    await databaseClient.from(FILTERS_TABLE).update({ publishers: values }).eq('id', 1);
}

/**
 * Updates the Developer search-filter values.
 */
export async function updateDeveloperFilter(values: string[]): Promise<void> {
    await databaseClient.from(FILTERS_TABLE).update({ developers: values }).eq('id', 1);
}







/*********
 * USERS *
 *********/

const USER_COLUMNS = "id, created_at, password_hash, role, email, username";

/**
 * Creates a user in the user table and returns the newly created user. Emails are unique so an error will be thrown in case the
 * email already exists in the user table. Email is used as lowercase in this system. This is to avoid users not being able 
 * to login/search members due to character(s) being mixed uppercase and lowercase. Also, as default the email is also stored as
 * the username since it is unique. A user can change the username to something else when logged in.
 */
export async function registerUser(userEmail: string, password_hash: string, username: string): Promise<{id: number, email: string}> {
    const lowerCaseEmail = userEmail.toLowerCase();
    const { data, error } = await databaseClient.from(USERS_TABLE).insert({email: lowerCaseEmail, password_hash, username}).select('id, email').single();
    
    if (error) {
        console.log(error);
        if (error instanceof AuthWeakPasswordError) {
            throw new Error('Password is to weak');
        } else if (error.code == '23505') {
            if (error.details.includes("email")) {
                throw new Error(`The email ${userEmail} is already in use`);
            } else if (error.details.includes("username")) {
                throw new Error(`The username ${username} is already in use`);
            }
        }
        throw error;
    }

    return data;
}

/**
 * Email is used as lowercase in this system. This is to avoid users not being able to login/search members due to character(s) being mixed
 * uppercase and lowercase.
 */
export async function getUserByEmail(email: string): Promise<User> {
    const lowerCaseEmail = email.toLowerCase();
    const { data, error } = await databaseClient.from(USERS_TABLE).select(USER_COLUMNS).eq('email', lowerCaseEmail).single();
    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export async function getUserById(id: number): Promise<User> {
    const { data, error } = await databaseClient.from(USERS_TABLE).select(USER_COLUMNS).eq('id', id).single();
    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export async function getAllUsers(): Promise<User[]> {
    const { data, error } = await databaseClient.from(USERS_TABLE).select(USER_COLUMNS);
    if (error) {
        console.log(error);
        return [];
    }
    return data;
}

export async function updateUser(id: number, last_name: string, first_name: string, bio: string): Promise<void> {
    const { error } = await databaseClient.from(PROFILES_TABLE).update({last_name, first_name, bio}).eq('id', id);
    if (error) {
        console.log(error);
        throw error;
    }
}

export async function updatePassword(id: number, password_hash: string): Promise<void> {
    const { error } = await databaseClient.from(USERS_TABLE).update({password_hash}).eq('id', id);
    if (error) {
        console.log(error);
        throw error;
    }
}

export async function updateEmail(id: number, email: string): Promise<void> {
    const { error } = await databaseClient.from(USERS_TABLE).update({email}).eq('id', id);
    if (error) {
        console.log(error);
        throw error;
    }
}

export async function updateUsername(id: number, username: string): Promise<void> {
    const { error } = await databaseClient.from(USERS_TABLE).update({username}).eq('id', id);
    if (error) {
        console.log(error);
        throw error;
    }
}

// Updates the name of the image used as a profile image. This image name is used to reference the image file stored in a bucket somewhere else.
async function updateUserImage(id: number, image: string): Promise<void> {
    const { error } = await databaseClient.from(PROFILES_TABLE).update({image}).eq('user_id', id);
    if (error) {
        console.log(error);
        throw error;
    }
}

/**
 * The profile image is stored in a folder named as the user's id.
 */
export async function updateProfileImageById(id: number, image: File): Promise<void> {
    await uploadFile(image.name, image, PROFILE_IMAGES_STORAGE, id.toString() + "/");   // uploads the image file to a bucket.
    await updateUserImage(id, image.name);  // updates the image name since this name is used to reference the uploaded image file.
}

/**
 * Update password hash for the account that corresponds to the supplied email.
 */
export async function updateUserPassword(email: string, password_hash: string): Promise<void> {
    const { error } = await databaseClient.from(USERS_TABLE).update({password_hash}).eq('email', email);
    if (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Check if a user with the supplied email exists.
 */
export async function emailExists(email: string): Promise<boolean> {
    const { data, error } = await databaseClient.from(USERS_TABLE).select().eq('email', email);
    return !(error || data.length === 0);
}

/**
 * Check if supplied password hash is a match for the given email address.
 */
export async function isCurrentPassword(email: string, password_hash: string): Promise<boolean> {
    const { data, error } = await databaseClient.from(USERS_TABLE).select().eq('email', email).single();
    if (error) {
        console.log(error);
        throw error;
    }

    return data.password_hash === password_hash;
}






/************
 * PROFILES *
 ***********/

export async function getProfileByUserId(user_id: number): Promise<Profile> {
    const { data, error } = await databaseClient.from(PROFILES_TABLE).select().eq('user_id', user_id).single();
    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export async function updateUserInformationById(id: number, full_name: string, phone: string, birth_date: string): Promise<void> {
    const { error } = await databaseClient.from(PROFILES_TABLE).update({full_name, phone, birth_date}).eq('user_id', id);
    if (error) {
        console.log(error);
        throw error;
    }
}




/***********
 * ADDRESS *
 **********/

export async function getAddressByUserId(user_id: number): Promise<Address> {
    const { data, error } = await databaseClient.from(ADDRESS_TABLE).select().eq('id', user_id).single();
    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export async function updateUserAddressById(id: number, street: string, city: string, country: string): Promise<void> {
    const { error } = await databaseClient.from(ADDRESS_TABLE).update({user_id: id, street, city, country}).eq('user_id', id);
    if (error) {
        console.log(error);
        throw error;
    }
}







/***********
 * SESSION *
 ***********/

/**
 * Creates a session when a user signs in.
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
    await databaseClient.from(ACCOUNTS_TABLE).insert({ user_id, activation_code });
}

/**
 * Copies the default profile image to the folder created for the newly registered user. The folder is named
 * after the registered user's id.
 */
export async function copyProfileImageToFolder(activation_code: string): Promise<void> {
    try {
        const response = await databaseClient.from(ACCOUNTS_TABLE).select().eq('activation_code', activation_code).single();
        await databaseClient.storage.from(PROFILE_IMAGES_STORAGE).copy('profile.png', `${response.data?.user_id}/profile.png`);
    } catch (error) {
        console.log(error);
    }
}

export async function getAccountByUserId(user_id: number): Promise<Account> {
    const { data, error } = await databaseClient.from(ACCOUNTS_TABLE).select().eq('user_id', user_id).single();
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
    const { data, error } = await databaseClient.from(ACCOUNTS_TABLE).select().eq('activation_code', activation_code).eq('activated', false);
    if (error || data.length === 0) {
        return false;
    }

    await databaseClient.from(ACCOUNTS_TABLE).update({activated: true}).eq('activation_code', activation_code);    
    return true;
}

/**
 * Used by admin to create a user and account directly by bypassing the email activation procedure.
 */
export async function createActivatedAccount(email: string, password_hash: string, username: string): Promise<void> {
    const user = await registerUser(email, password_hash, username);
    await databaseClient.from(ACCOUNTS_TABLE).insert({ user_id: user.id, activated: true });
    await databaseClient.storage.from(PROFILE_IMAGES_STORAGE).copy('profile.png', `${user.id}/profile.png`);
}












