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
    description: string
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