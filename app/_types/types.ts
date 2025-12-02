export type Game = {
    id: number,
    title: string,
    publisher: string,
    developer: string,
    category: string,
    release_date: string,
    cover: string,
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
    created_at: Date,
    last_name: string,
    first_name: string,
    full_name: string,
    username: string,
    password_hash: string,
    birth_date: string,
    city: string,
    address: string,
    country: string,
    role: string,
    image: string,
    bio: string
}

export type Account = {
    id: number,
    user_id: number,
    activated: boolean,
    activation_code: string
}

export type FrequentlyAskedQuestion = {
    type: string,
    question: string,
    answer: string
}

export type FilterValues = {
    categories: string[],
    publishers: string[],
    developers: string[]
}

export type ActionState = {
    message: string,
    success: boolean
}

export type TimelineEvent = {
    year: number,
    title: string,
    text: string,
    image: string
}

export type InitialUserState = {
    birthDate: string,
    city: string,
    country: string,
    fullName: string,
    message: string, 
    address: string,
    success: boolean, 
    firstName: string, 
    lastName: string, 
    bio: string
}

export type News = {
    id: number,
    text: string,
    heading: string,
    date: Date,
    image: string,
    author: string
}