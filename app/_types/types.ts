export type ActionState = {
    message: string,
    success: boolean
}

export type Article = {
    id: number,
    introduction: string,
    title: string,
    tags: string[],
    text: string,
    articleContents: ArticleContent[],
    image: string
}

export type ArticleContent = {
    heading: string,
    text: string
}

export type FilterValues = {
    categories: string[],
    publishers: string[],
    developers: string[]
}

export type Filter = "category" | "publisher" | "developer" | "title";

export type FrequentlyAskedQuestion = {
    type: string,
    question: string,
    answer: string
}

export type Game = {
    id: number,
    title: string,
    publisher: string,
    developer: string,
    category: string,
    releaseDate: string,
    cover: string,
    players: number,
    description: string,
    rom: boolean
}

export type News = {
    id: number,
    text: string,
    heading: string,
    published: string,
    image: string,
    author: string
}

export type Profile = {
    userId: number,
    lastName: string,
    firstName: string,
    fullName: string,
    birthDate: string | null,
    image: string,
    phone: string,
    bio: string
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
    userId: number,
    expiresAt: Date,
    tokenValue: string
}

export type TimelineEvent = {
    year: number,
    title: string,
    text: string,
    image: string
}

export type User = {
    id: number,
    email: string,
    createdAt: Date,
    username: string,
    passwordHash: string,
    role: string
}