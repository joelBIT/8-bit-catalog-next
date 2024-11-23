import { Game } from '@/interfaces/interfaces';
import games from '../app/lib/games/data.json';

export function getGames() {
    return games;
}

export function createGameList(): Game[] {
        const cartridges = getGames().map((game: any) => {
            game.cover = game.cover ? game.cover : "notavailable.jpg";
            game.players = game.players ? game.players : 1;
            game.description = game.description ? game.description : [];
            game.releaseDate = game.releaseDate ? game.releaseDate : "";
            return copyGame(game);
        });

        cartridges.sort((a: { title: string; }, b: { title: any; }) => a.title.localeCompare(b.title));
        return cartridges;
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