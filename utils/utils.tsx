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
    return ["1", "2", "3", "4", "5", "6", "7", "8"];
}

export function getCategories(): string[] {
    return ["All", "Action", "Adult", "Adventure", "Educational", "Fighting", "Puzzle", "Racing", "Role-Playing",
        "Shooter", "Simulation", "Sports", "Strategy", "Traditional", "Various"
    ];
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
 * Sends an email to supplied email address.
 * 
 * @param email             the email address to which the email is sent
 * @param subject           the email subject
 * @param text              the email body text
 */
async function sendMail(email: string, subject: string, text: string) {
    await fetch('/api/send', {
        method:'POST',
        body:JSON.stringify({
            'email': email,
            'subject': subject,
            'text': text
        })
    });
}

/**
 * Test if localstorage is available. Favourite games are added to localstorage if true. If false,
 * the FavouritesContext stores favourite games temporarily.
 * 
 * @returns true if localstorage is available, false otherwise
 */
export function isLocalStorageAvailable() {
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