import { ArticleContent } from "../_db/schema/article_contents";
import { Game } from "../_db/schema/games";
import { CATEGORY_ASC, CATEGORY_DES, DEVELOPER_ASC, DEVELOPER_DES, PLAYERS_ASC, PLAYERS_DES, PUBLISHER_ASC, PUBLISHER_DES, TITLE_ASC, TITLE_DES } from "../_utils/utils";

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

export type Filter = "category" | "publisher" | "developer" | "title";

export type SortOrder = typeof TITLE_ASC | typeof TITLE_DES | typeof PLAYERS_ASC | typeof PLAYERS_DES | typeof PUBLISHER_ASC | typeof PUBLISHER_ASC | typeof PUBLISHER_DES | typeof DEVELOPER_DES | typeof DEVELOPER_ASC | typeof CATEGORY_ASC | typeof CATEGORY_DES;

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

export type ContactState = ActionState & {
    values?: { name: string; email: string; message: string };
};

export type AddressState = ActionState & AddressFormData;

type AddressFormData = {
    zip_code: string,
    city: string,
    country: string,
    street: string
}