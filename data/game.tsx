'use client';

import { Game } from '@/interfaces/interfaces';
import { getGames } from './data';

/**
 * The game data source is created if it does not exist yet. Will be migrated to a database later.
 * 
 * @returns list of all games in data source.
 */
export function getAllGames(): Game[] {
    createGameData();
    return JSON.parse(localStorage.getItem('games') || "[]");
}

export function storeAllGames(games: Game[]): void {
    localStorage.setItem('games', JSON.stringify(games));
}

/**
 * A check is done to see if local storage contains the game objects. If data is missing, game data 
 * is read from a json file and transformed into Game objects before being added to local storage.
 */
export function createGameData(): void {
    if (!localStorage.getItem('games')) {
        const cartridges = getGames().map((game: any) => {
            game.cover = game.cover ? game.cover : "notavailable.jpg";
            game.players = game.players ? game.players : 1;
            game.description = game.description ? game.description : [];
            game.releaseDate = game.releaseDate ? game.releaseDate : "";
            return copyGame(game);
        });

        cartridges.sort((a: { title: string; }, b: { title: any; }) => a.title.localeCompare(b.title));
        storeAllGames(cartridges);
    }
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
 * Stores a new game to the list of all games. The list containing the new game is sorted alphabetically
 * before being persisted.
 * 
 * @param game  the new game
 */
export function storeGame(game: Game): void {
    const games = getAllGames();
    games.push(game);
    games.sort((a, b) => a.title.localeCompare(b.title));
    storeAllGames(games);
}

/**
 * Retrieves an existing game. Throws an error if no game is found.
 * 
 * @param id        the ID of the game to retrieve
 * @returns         the game or throws an error
 */
export function getGame(id: number): Game {
    const game =  getAllGames().find(game => game.id === id);
    if (!game) {
        throw new Error(`Game with id ${id} does not exist`);
    }

    return game;
}

/**
 * Deletes an existing game by removing the copy of the game.
 * 
 * @param id    the ID of the game to delete
 */
export function deleteGame(id: number): void {
    const games = getAllGames();
    const updatedList = games.filter(game => game.id !== id);
    storeAllGames(updatedList);
}

/**
 * Updates an existing game by replacing the old copy of the game with a new copy.
 *  
 * @param updatedGame       the updated copy of the game
 */
export function updateGame(updatedGame: Game): void {
    const games = getAllGames();
    const updatedList = games.filter(game => game.id !== updatedGame.id);
    updatedList.push(updatedGame);
    storeAllGames(updatedList);
}
