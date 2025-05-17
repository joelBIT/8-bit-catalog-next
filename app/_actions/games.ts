'use server';

import { revalidatePath } from 'next/cache';
import { updateGameById } from "@/app/_db/db";
import { Game } from "@/types/types";
import { URL_GAME_DETAILS_PAGE } from '@/utils/utils';
import { isAuthenticatedAdmin } from '@/app/_session/utils';

/**
 * Updates an existing game's metadata. 
 */
export async function updateGame(_prevState: any, formData: FormData): Promise<{message: string, success: boolean}> {
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

    revalidatePath(`${URL_GAME_DETAILS_PAGE}/[id]`, "page");
    return { message: 'Game updated', success: true };
}