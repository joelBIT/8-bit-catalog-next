import { Game } from '@/interfaces/interfaces';

export async function getAllGames(): Promise<Game[]> {
    try {
        const response = await fetch('/api/games');
        const data = await response.json();
        const cartridges = data.map((game: any) => {
            game.cover = game.cover ? game.cover : "notavailable.jpg";
            game.players = game.players ? game.players : 1;
            game.description = game.description ? game.description : "";
            game.releaseDate = game.releaseDate ? game.releaseDate : "";
            return copyGame(game);
        });

        cartridges.sort((a: { title: string; }, b: { title: any; }) => a.title.localeCompare(b.title));
        return cartridges;

    } catch (error) {
        console.error(error);
    }

    return [];
}

export function copyGame(game: Game): Game {
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
        releaseDate: game.releaseDate
    }
}