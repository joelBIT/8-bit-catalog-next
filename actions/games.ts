'use server';

import { revalidatePath } from 'next/cache';
import { updateGameById } from "@/db/db";
import { Game } from "@/types/types";
import { URL_GAME_DETAILS_PAGE } from '@/utils/utils';

/**
 * Updates an existing game's metadata. 
 */
export async function updateGame(id: number, formData: FormData): Promise<void> {

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
        rom: (formData.get('rom') as string) === "true" ? true : false
    };

    await updateGameById(game, formData.get('cover') as File);

    revalidatePath(`${URL_GAME_DETAILS_PAGE}/[id]`, "page");
}