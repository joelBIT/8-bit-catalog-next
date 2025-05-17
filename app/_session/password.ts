import { hash, verify } from "@node-rs/argon2";

/**
 * Hash a password when a user signs up. 
 */
export async function hashPassword(password: string): Promise<string> {
    return await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });
};

/**
 * Verify the password when a user signs in.
 */
export async function verifyPasswordHash(hash: string, password: string): Promise<boolean> {
    return await verify(hash, password);
};