import { User } from "@/interfaces/interfaces";
import { generateUserId } from "@/utils/utils";


export function getAllUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

export function storeAllUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
}

/**
 * Updates an existing user by replacing the existing user object with a new and updated copy
 * of that user.
 * 
 * @param updatedUser       the copy containing updated information about a user
 */
export function updateUser(updatedUser: User): void {
    const users = getAllUsers().filter(user => user.id !== updatedUser.id);
    users.push(updatedUser);
    storeAllUsers(users);
}

/**
 * An anonymous user is created and used when a user of the application is not logged in.
 * 
 * @returns         an anonymous user
 */
export function createAnonymousUser(): User {
    return {
         id: -1,
         username: "anonymous",
         isAdmin: false,
         isAuthenticated: false,
         password: "",
         email: ""
     }
 }
 
/**
 * Creates a new user based on the supplied arguments. Validation of the username and password is done here
 * because this is where the new user becomes created and persisted. If the username is already taken or supplied
 * passwords do not match, an error is thrown.
 * 
 * @returns         the newly created and persisted user
 */
export function createNewUser(username: string, password: string, passwordRepeat: string, email: string): User {
    if (userExists(username)) {
        throw new Error(`User ${username} already exists!`);
    }

    comparePasswords(password, passwordRepeat);

     const user =  {
         id: generateUserId(),
         username : username,
         password : password,
         isAdmin: false,
         email: email,
         isAuthenticated: false
     }

    const users = getAllUsers();
    users.push(user);
    storeAllUsers(users);

    return user;
 }

export function getUser(username: string): User {
    const user = getAllUsers().find((user: { username: string; }) => user.username === username);
    if (user) {
        return user;
    } else {
        throw new Error(`User ${username} does not exist`);
    }
}

export function userExists(username: string): boolean {
    const users = getAllUsers();
    return users.find((user: { username: string; }) => user.username === username) ? true : false;
}

/**
 * When a user is logged in the user becomes authenticated.
 * 
 * @param user      the user that logged in successfully
 */
export function authenticate(user: User): void {
    user.isAuthenticated = true;
    setActiveUser(user);
}

export function validatePassword(storedPassword: string, givenPassword: string): void {
    if(storedPassword !== givenPassword) {
        throw new Error('Incorrect password');
    }
}

export function comparePasswords(password: string, passwordRepeat: string): void {
    if (password !== passwordRepeat) {
        throw new Error('Passwords do not match!');
    }
}

/**
 * An active user is either the user that is currently logged in, or an anonymous user.
 * 
 * @returns     the user that is currently using the application
 */
export function getActiveUser(): User {
    const activeUser = localStorage.getItem('activeUser') || "{}";
    return JSON.parse(activeUser);
}

export function setActiveUser(user: User): void {
    localStorage.setItem('activeUser', JSON.stringify(user));
}

export function activeUserExists(): boolean {
    return localStorage.getItem('activeUser') ? true : false;
}