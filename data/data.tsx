import { Game } from '@/types/types';

export async function getAllGames(): Promise<Game[]> {
    try {
        const response = await fetch('/api/games');
        const cartridges = await response.json();

        cartridges.sort((a: { title: string; }, b: { title: any; }) => a.title.localeCompare(b.title));
        return cartridges;

    } catch (error) {
        console.error(error);
    }

    return [];
}

export async function getAllDevelopers(): Promise<string[]>  {
    const response = await fetch('/api/developers');
    const developers = await response.json();
    return Array.from(developers);
}

export async function getAllPublishers(): Promise<string[]>  {
    const response = await fetch('/api/publishers');
    const publishers = await response.json();
    return Array.from(publishers);
}