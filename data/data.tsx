import { Game } from '@/interfaces/interfaces';

export async function getAllGames(): Promise<Game[]> {
    try {
        const response = await fetch('/api/games');
        const data = await response.json();
        const cartridges = data.map((game: any) => {
            game.players = game.players ? game.players : 1,
            game.description = game.description as string,
            game.releaseDate = game.releaseDate as string
            return copyGame(game);
        });

        cartridges.sort((a: { title: string; }, b: { title: any; }) => a.title.localeCompare(b.title));
        return cartridges;

    } catch (error) {
        console.error(error);
    }

    return [];
}

function copyGame(game: Game): Game {
    return {
        id: game.id,
        title: game.title,
        category: game.category,
        cover: game.cover,
        publisher: game.publisher,
        description: game.description,
        developer: game.developer,
        players: game.players,
        releaseYear: game.releaseYear,
        releaseDate: game.releaseDate,
        imageLink: game.imageLink
    }
}