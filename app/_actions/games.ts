'use server';

import { ActionState } from "@/app/_types/types";
import { isAuthenticatedAdmin } from '@/app/_session/sessionUtils';
import { updateGameById } from "../_db/games-db";
import { InsertGame } from "../_db/schema/games";

/**
 * Updates an existing game's metadata. 
 */
export async function updateGame(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const isAdmin = await isAuthenticatedAdmin();
    if (!isAdmin) {
        return { message: 'Only admins may update games', success: false };
    }

    try {
        const id = parseInt(formData.get('id') as string);

        const game: InsertGame = {
            title: formData.get('title') as string,
            developer: formData.get('developer') as string,
            publisher: formData.get('publisher') as string,
            description: formData.get("description") as string,
            players: parseInt(formData.get('players') as string),
            releaseDate: formData.get('released') as string,
            cover: (formData.get('cover') as File).name,
            category: formData.get('category') as string,
            rom: formData.get('rom') ? true : false
        };

        await updateGameById(id, game, formData.get('cover') as File);
    } catch (error) {
        console.log(error);
        return { message: 'Could not update game', success: false };
    }

    return { message: 'Game updated', success: true };
}