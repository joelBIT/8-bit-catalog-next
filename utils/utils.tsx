import { getAllGames } from "@/data/game";
import { getAllUsers } from "@/data/user";

export const ACTION_OPTION_VALUE = "Action";
export const ALL_OPTION_VALUE = "All";
export const ASSETS_URL = "src/assets";
export const COVER_URL = `${ASSETS_URL}/covers`;
export const PAGINATION_PAGE_SIZE = 15;

export const URL_ABOUT_PAGE = "/about";
export const URL_ACCOUNT_PAGE = "/account";
export const URL_EDIT_GAME_DETAILS_PAGE = "/editgame";
export const URL_FAVOURITES_PAGE = "/favourites";
export const URL_FORBIDDEN_PAGE = "/403";
export const URL_GAME_DETAILS_PAGE = "/gamedetails";
export const URL_HOME = "/";
export const URL_LOGIN_PAGE = "/login";
export const URL_LOGOUT_PAGE = "/logout";
export const URL_NOT_FOUND_PAGE = "*";
export const URL_REGISTER_PAGE = "/register";
export const URL_REQUEST_PAGE = "/request";
export const URL_REVIEW_PAGE = "/review";
export const URL_SEARCH_PAGE = "/games";


/**
 * Creates a list of option values for a Select component. The list of option values is sorted
 * alphabetically in the Select list, and empty values are removed.
 * 
 * @param property      the game property which values are to be included in an option values list
 * @returns             a list containing option values of a game property sorted alphabetically
 */
export function createSelectList(property: string): string[] {
    let games = getAllGames().map((game: { [x: string]: any; }) => game[property]);
    games.sort();
    games = games.filter((element: any) => element != null);
    return Array.from(new Set(games));
}

/**
 * Creates a list of options for a Filter component. This list contains the 'ALL' option so that
 * filtering can be performed on all properties at the same time.
 * 
 * @param property      the game property which values are to be included in an option values list
 * @returns             a list containing option values (as well as 'ALL') of a game property sorted alphabetically
 */
export function createFilterList(property: string): string[] {
    return addAllOption(createSelectList(property));
}

/**
 * Adds the 'ALL' option to the list so that a search can be performed on all games.
 * 
 * @param list      list of options in filter list
 * @returns         list of options in filter list including the 'All' option
 */
export function addAllOption(list: string[]): string[] {
    list.unshift(ALL_OPTION_VALUE);
    return list;
}

/**
 * 
 * @returns   a list containing the choosable options for players in a game.
 */
export function getPlayersList(): string[] {
    return ["1", "2", "3", "4", "5", "6"];
}

/**
 * The types of files that a user is permitted to upload.
 */
export const fileTypes = [
    'image/apng',
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
    `image/x-icon`
];

/**
 * Generates a new game ID by adding 1 to the current maximum id.
 * 
 * @returns     a generated ID for a new game
 */
export function generateGameId(): number {
    return getAllGames().map(game => game.id).reduce((a, b) => a > b ? a : b, 0) + 1;
}

/**
 * Generates a new user ID by adding 1 to the current maximum id.
 * 
 * @returns     a generated ID for a new user
 */
export function generateUserId(): number {
    return getAllUsers().map(user => user.id).reduce((a, b) => a > b ? a : b, 0) + 1;
}

export function joinParagraphs(text: string[]): string {
    return text ? text.join("\n\n") : text;
}

export function createParagraphs(text: string): string[] {
    return text.split('\n').filter((element: string) => element !== "");
}