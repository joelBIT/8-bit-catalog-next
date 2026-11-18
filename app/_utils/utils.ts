import { Game } from "../_db/schema/games";
import { SortOrder } from "../_types/types";

export const ALL_OPTION_VALUE = "All";

export const URL_ABOUT_PAGE = "/about";
export const URL_ARCHITECTURE_PAGE = "/architecture";
export const URL_ARTICLES_PAGE = "/articles";
export const URL_COLLECTION_PAGE = "/collection";
export const URL_CONTACT_PAGE = "/contact";
export const URL_DASHBOARD_PAGE = "/dashboard";
export const URL_FAQ_PAGE = "/faq";
export const URL_FILTERS_PAGE = URL_DASHBOARD_PAGE + "/filters";
export const URL_FORBIDDEN_PAGE = "/forbidden";
export const URL_FORGOT_PAGE = "/forgot";
export const URL_GAME_PAGE = "/game";
export const URL_HOME = "/";
export const URL_LOGIN_PAGE = "/login";
export const URL_MEMBERS_PAGE = URL_DASHBOARD_PAGE + "/members";
export const URL_NEWSLETTER_PAGE = URL_DASHBOARD_PAGE + "/newsletter";
export const URL_NEWS_PAGE = "/news";
export const URL_REGISTER_PAGE = "/register";
export const URL_RESET_PAGE = "/reset";
export const URL_RESOURCES_PAGE = "/resources";
export const URL_SEARCH_PAGE = "/search";
export const URL_SETTINGS_PAGE = URL_DASHBOARD_PAGE + "/settings";
export const URL_TIMELINE_PAGE = "/timeline";

export const ROLE_ADMIN = "admin";
export const ROLE_USER = "user";

export const FAQ_GENERAL = "General";
export const FAQ_ACCOUNT = "Account";
export const FAQ_GAMES = "Games";

export const PROFILE_BUCKET = "catalog";        // The bucket used to store profile images
export const DEFAULT_PROFILE_IMAGE = 'profile.png';

export const SEARCH_KEYS = ['title', 'category', 'developer', 'publisher'];

// Sort orders
export const TITLE_ASC = "titleAsc";
export const TITLE_DES = "titleDes";
export const CATEGORY_ASC = "categoryAsc";
export const CATEGORY_DES = "categoryDes";
export const DEVELOPER_ASC = "developerAsc";
export const DEVELOPER_DES = "developerDes";
export const PLAYERS_ASC = "playersAsc";
export const PLAYERS_DES = "playersDes";
export const PUBLISHER_ASC = "publisherAsc";
export const PUBLISHER_DES = "publisherDes";

/**
 * Adds the 'All' option to the list so that a search can be performed on all games. The 'All' value is not added
 * if the list already contains it.
 * 
 * @param list      list of options in filter list
 * @returns         list of options in filter list including the 'All' option
 */
export function addAllOption(list: string[]): string[] {
    if (!list.includes(ALL_OPTION_VALUE)) {
        list.unshift(ALL_OPTION_VALUE);
    }
    return list;
}

/**
 * 
 * @returns   a list containing the choosable options for players in a game.
 */
export function getPlayersList(): string[] {
    return ["1", "2", "3", "4", "5", "6", "7", "8"];
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
 * Test if localstorage is available. Favourite games are added to localstorage if true. If false,
 * the FavouritesContext stores favourite games temporarily.
 * 
 * @returns true if localstorage is available, false otherwise
 */
export function isLocalStorageAvailable(): boolean {
    try {
        const key = 'testingLocalStorage';
        localStorage.setItem(key, 'add');
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Converts the supplied month (number) into the corresponding month as a text representation.
 */
export function getMonthText(month: number): string {
    switch(month) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            return "";
    }
}

/**
 * Formats a date-only value (a Postgres `date` column, as a "YYYY-MM-DD" string or a
 * Date at UTC midnight) as e.g. "September 13, 1985". UTC getters are used on purpose:
 * local getters would show the previous day in timezones west of UTC.
 */
export function convertDateToString(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return `${getMonthText(d.getUTCMonth())} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/**
 * Converts a date-only value to the "YYYY-MM-DD" string an <input type="date"> expects.
 * Returns an empty string when there is no date.
 */
export function toDateInputValue(date: Date | null | undefined): string {
    return date ? date.toISOString().slice(0, 10) : '';
}

/**
 * Text should not be longer than 'maxLength' characters. If it is, replace the remaining characters with three dots.
 */
export function adjustTextLength(text: string, maxLength: number): string {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }

    return text;
}

/**
 * Used to rename uploaded profile images to profile.png in order to replace the old profile.png files in storage.
 */
export function renameFile(originalFile: File, newName: string) {
    return new File([originalFile], newName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified
    });
}

/**
 * Sort games according to selected option.
 */
export function sortGames(games: Game[], sort: SortOrder): Game[] {
    const gamesToSort = [...games];

    if (sort === TITLE_ASC) {
        return gamesToSort.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === TITLE_DES) {
        return gamesToSort.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort === PLAYERS_ASC) {
        return gamesToSort.sort((a, b) => a.players - b.players);
    } else if (sort === PLAYERS_DES) {
        return gamesToSort.sort((a, b) => b.players - a.players);
    } else if (sort === PUBLISHER_ASC) {
        return gamesToSort.sort((a, b) => a.publisher.localeCompare(b.publisher));
    } else if (sort === PUBLISHER_DES) {
        return gamesToSort.sort((a, b) => b.publisher.localeCompare(a.publisher));
    } else if (sort === DEVELOPER_ASC) {
        return gamesToSort.sort((a, b) => a.developer.localeCompare(b.developer));
    } else if (sort === DEVELOPER_DES) {
        return gamesToSort.sort((a, b) => b.developer.localeCompare(a.developer));
    } else if (sort === CATEGORY_ASC) {
        return gamesToSort.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sort === CATEGORY_DES) {
        return gamesToSort.sort((a, b) => b.category.localeCompare(a.category));
    }

    return games;
}

/**
 * Helper for extracting values from formData in actions.
 */
export function readFormValues<K extends string>(formData: FormData, keys: readonly K[]): Record<K, string> {
    return Object.fromEntries(keys.map(key => [key, String(formData.get(key) ?? '')])) as Record<K, string>;
}

/**
 * Make first letter in a string capitalized (e.g., query params that should match input values in search page).
 */
export function capitalize(str: string | undefined): string {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}