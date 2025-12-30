import 'server-only';

import { AuthWeakPasswordError } from '@supabase/supabase-js';
import { User } from '@/app/_types/types';
import { databaseClient, USERS_TABLE } from './db';


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

/**
 * Retrieve user with supplied user ID.
 */
export async function getUserById(id: number): Promise<User> {
    const { data, error } = await databaseClient.from(USERS_TABLE).select(USER_COLUMNS).eq('id', id).single();
    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

/**
 * Retrieve all users.
 */
export async function getAllUsers(): Promise<User[]> {
    const { data, error } = await databaseClient.from(USERS_TABLE).select(USER_COLUMNS);
    if (error) {
        console.log(error);
        return [];
    }
    return data;
}

/**
 * Update password by replacing the existing password hash with the hash of the new password.
 */
export async function updatePasswordByUserId(id: number, password_hash: string): Promise<void> {
    const { error } = await databaseClient.from(USERS_TABLE).update({password_hash}).eq('id', id);
    if (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Update email adress for user with supplied user ID.
 */
export async function updateEmailByUserId(id: number, email: string): Promise<void> {
    const { error } = await databaseClient.from(USERS_TABLE).update({email}).eq('id', id);
    if (error) {
        console.log(error);
        throw error;
    }
}

export async function updateUsernameByUserId(id: number, username: string): Promise<void> {
    const { error } = await databaseClient.from(USERS_TABLE).update({username}).eq('id', id);
    if (error) {
        console.log(error);
        throw error;
    }
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