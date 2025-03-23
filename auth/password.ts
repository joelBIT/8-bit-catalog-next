import { hash, verify } from "@node-rs/argon2";

/**
 * Hash a password when a user signs up. 
 */
export const hashPassword = async (password: string) => {
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
export const verifyPasswordHash = async (hash: string, password: string) => {
    return await verify(hash, password);
};