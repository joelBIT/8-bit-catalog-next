export type Game = {
    id: number,
    title: string,
    publisher: string,
    developer: string,
    category: string,
    release_date: string,
    cover: string,
    imageLink: string,
    players: number,
    description: string,
    rom: boolean
}

export type SearchFilter = {
    title: string,
    category: string,
    developer: string,
    publisher: string,
    page: string
}

export type SearchResult = {
    games: Game[],
    count: number
}

export type Session = {
    user_id: number,
    expires_at: Date,
    token_value: string
}

export type User = {
    id: number,
    email: string,
    last_name: string,
    first_name: string,
    password_hash: string,
    role: string
}