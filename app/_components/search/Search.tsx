'use client';

import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGames } from "@/app/_hooks";
import { Game } from "@/app/_db/schema/games";
import { ScrollTopButton } from "../common";
import { SearchResultOptions } from "./SearchResultOptions";
import { sortGames } from "@/app/_utils/utils";

import "./Search.css";

/**
 * Searches for games that matches the supplied filter values as well as the given title text.
 * The searchResult state contains the games that matches the search query. The showHeading state
 * is set to inform the user that no games matched the search query.
 */
export function Search(): ReactElement {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const title = params.get('title') || '';
    const category = params.get('category') as string;
    const developer = params.get('developer') as string;
    const publisher = params.get('publisher') as string;
    const [searchResult, setSearchResult] = useState<Game[]>([]);
    const [showHeading, setShowHeading] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number>();
    const { games, getFilteredGames, sortOrder } = useGames();
    
    useEffect(() => {
        if ((title || category || developer || publisher)) {    // Query params (These exists only if a search has already been performed)
            search();                   // Perform a search on query params
        }
    }, [title, category, developer, publisher])

    /**
     * Handle page refresh.
     */
    useEffect(() => {
        if (games.length && showHeading) {      // When showHeading is true a search has taken place earlier.
            search();           // Perform a search again when page is refreshed to show the same results as before the refresh
        }
    }, [games.length])          // Length of games become 0 when refreshing the page because the context is emptied and must retrieve games again.

    /**
     * Performs a search based on given title text and filters.
     */
    async function search(): Promise<void> {
        const filteredGames = getFilteredGames({title, category, developer, publisher});
        setSearchResult(sortGames(filteredGames, sortOrder));
        setTotalCount(filteredGames.length);
        setShowHeading(true);           // Set to true after first search is executed
    }

    let content = <> { showHeading ? <h1 className="search-result-text message-failure"> No games found </h1> : <></> } </>;

    if (searchResult.length > 0) {
        content = <>
            <h1 className="search-result-text message-success"> {`Found ${totalCount} game${searchResult.length > 1 ? "s" : ""}`} </h1>
            <SearchResultOptions searchResult={searchResult} setSortedGames={setSearchResult} />
        </>
    }

    return (
        <section id="search">
            {content}
        
            <ScrollTopButton />
        </section>
    );
}