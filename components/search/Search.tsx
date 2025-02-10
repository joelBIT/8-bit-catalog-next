'use client';

import { ReactElement, useEffect, useState } from "react";
import { getGames } from "@/data/data";
import { Game, SearchFilter } from "@/types/types";
import { SearchResult } from "./SearchResult";

/**
 * Searches for games that matches the supplied filter values as well as the given title text.
 * The searchResult state contains the games that matches the search query. The showHeading state
 * is set on each search to inform the user about how many games that matches the search query.
 */
export function Search({ searchParams } : { searchParams: SearchFilter }): ReactElement<ReactElement> {
    const [ searchResult, setSearchResult ] = useState<Game[]>([]);
    const [ showHeading, setShowHeading ] = useState<boolean>(false);
    const title = searchParams.title;
    const category = searchParams.category;
    const developer = searchParams.developer;
    const publisher = searchParams.publisher;

    useEffect(() => {
        if ((title || category || developer || publisher) !== undefined) {          // Undefined means that the query string does not exist (first visit of search page)
            search(title.trim(), category, developer, publisher);                   // Trim whitespaces from title beginnings and ends
        }
    }, [title, category, developer, publisher])

    /**
     * Performs a search based on given title text and filters. The search is executed either
     * when the button is pressed or when the Enter key is pressed in the input field.
     */
    async function search(title: string, category: string, developer: string, publisher: string) {
        
        const searchFilters: SearchFilter = {
            title: title,
            category: category,
            developer: developer,
            publisher: publisher
        }

        setSearchResult(await getGames(searchFilters));
        setShowHeading(true);
    }

    return (
        <section id="search">
            <SearchResult result={searchResult} showHeading={showHeading} />
        </section>
    );
}