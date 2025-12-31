import { ArticleContent } from "../_db/schema/article_contents";
import { Game } from "../_db/schema/games";

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

export type FilterValues = {
    categories: string[],
    publishers: string[],
    developers: string[]
}

export type Filter = "category" | "publisher" | "developer" | "title";

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