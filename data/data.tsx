import { Game } from '@/types/types';

export async function getAllGames(): Promise<Game[]> {
    try {
        const response = await fetch('/api/games', { cache: 'force-cache' });
        const cartridges = await response.json();

        cartridges.sort((a: { title: string; }, b: { title: any; }) => a.title.localeCompare(b.title));
        return cartridges;

    } catch (error) {
        console.error(error);
    }

    return [];
}

export async function getAllDevelopers(): Promise<string[]>  {
    const response = await fetch('/api/developers', { cache: 'force-cache' });
    return await response.json();
}

export async function getAllPublishers(): Promise<string[]>  {
    const response = await fetch('/api/publishers', { cache: 'force-cache' });
    return await response.json();
}