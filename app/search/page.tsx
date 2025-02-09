'use client';

import { ReactElement, useState } from "react";
import { Game } from "@/types/types";
import { SearchForm } from "@/components/search/SearchForm";
import { SearchResult } from "@/components/search/SearchResult";
import { getGames } from "@/data/data";

import "./page.css";

export default function SearchPage(): ReactElement {
    const [searchResult, setSearchResult] = useState<Game[]>([]);
    const [showHeading, setShowHeading] = useState<boolean>(false);
    
    /**
     * Searches for games that matches the supplied filter values as well as the given title text.
     * The searchResult state contains the games that matches the search query. The showHeading state
     * is set on each search to inform the user about how many games that matches the search query.
     */
    async function search(title: string, category: string, publisher: string, developer: string): Promise<void> {
        const games = await getGames({title, category, developer, publisher});

        setShowHeading(true);
        setSearchResult(games);
    }

    return (
        <main id="searchPage">
            <SearchForm search={search} />
            <SearchResult result={searchResult} showHeading={showHeading} />
        </main>
    );
}