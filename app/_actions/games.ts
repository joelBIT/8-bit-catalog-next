'use server';

import { updateGameById } from "@/app/_db/db";
import { ActionState, Game } from "@/app/_types/types";
import { isAuthenticatedAdmin } from '@/app/_session/utils';

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

        const game: Game = {
            id: id,
            title: formData.get('title') as string,
            developer: formData.get('developer') as string,
            publisher: formData.get('publisher') as string,
            description: formData.get("description") as string,
            players: parseInt(formData.get('players') as string),
            release_date: formData.get('released') as string,
            cover: (formData.get('cover') as File).name,
            category: formData.get('category') as string,
            rom: formData.get('rom') ? true : false
        };

        await updateGameById(game, formData.get('cover') as File);
    } catch (error) {
        console.log(error);
        return { message: 'Could not update game', success: false };
    }

    return { message: 'Game updated', success: true };
}