import { Game } from '@/interfaces/interfaces';
import { getGames } from './data';

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

export function createGame(id: number, title: string, category: string, publisher: string, developer: string, 
                                releaseYear: number, releaseDate: string, description: string[], players = 1, cover = "notavailable.jpg"): Game {
    return {
        id: id,
        title: title,
        category: category,
        cover: cover,
        publisher: publisher,
        developer: developer,
        players: players,
        description: description,
        releaseYear: releaseYear,
        releaseDate: releaseDate
    }
}

/**
 * Retrieves an existing game. Throws an error if no game is found.
 * 
 * @param id        the ID of the game to retrieve
 * @returns         the game or throws an error
 */
export function getGame(id: number) {
    const game =  getGames().find(game => game.id === id);
    if (!game) {
        throw new Error(`Game with id ${id} does not exist`);
    }

    return game;
}
