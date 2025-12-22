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
    publisher: string
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

export type Address = {
    user_id: number,
    street: string,
    city: string,
    country: string,
    zip_code: string
}

export type User = {
    id: number,
    email: string,
    created_at: Date,
    username: string,
    password_hash: string,
    role: string
}

export type Profile = {
    user_id: number,
    last_name: string,
    first_name: string,
    full_name: string,
    birth_date: string,
    image: string,
    bio: string
}

export type Account = {
    id: number,
    user_id: number,
    activated: boolean,
    activation_code: string,
    last_login: string,
    failed_login_attemps: number
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

export type Filter = "category" | "publisher" | "developer" | "title";

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

export type Article = {
    id: number,
    introduction: string,
    title: string,
    tags: string[],
    text: string,
    article_contents: ArticleContent[],
    image: string
}

export type ArticleContent = {
    heading: string,
    text: string
}