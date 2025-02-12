import { SearchFilter, SearchResult } from '@/types/types';

export async function getGames(filters: SearchFilter): Promise<SearchResult> {
    try {
        const response = await fetch(`/api/games?title=${filters.title.trim()}&category=${filters.category}&developer=${filters.developer}&publisher=${filters.publisher}&page=${filters.page}`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }

    return {games: [], count: 0};
}

export async function getAllDevelopers(): Promise<string[]>  {
    const response = await fetch('/api/developers', { cache: 'force-cache' });
    return await response.json();
}

export async function getAllPublishers(): Promise<string[]>  {
    const response = await fetch('/api/publishers', { cache: 'force-cache' });
    return await response.json();
}