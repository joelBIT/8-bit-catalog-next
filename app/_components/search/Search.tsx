'use client';

import { ReactElement, useEffect, useState } from "react";
import { useGames } from "@/app/_hooks";
import { useOptions } from "@/app/_hooks/useOptions";
import { Game } from "@/app/_db/schema/games";
import { ScrollTopButton } from "../common";
import { SearchResultOptions } from "./SearchResultOptions";
import { sortGames } from "@/app/_utils/utils";
import { SearchFilter } from "@/app/_types/types";

import "./Search.css";

/**
 * Searches for games that matches the supplied filter values as well as the given title text.
 * The searchResult state contains the games that matches the search query. The showHeading state
 * is set to inform the user that no games matched the search query.
 */
export function Search({ params }: { params: SearchFilter}): ReactElement {
    const [searchResult, setSearchResult] = useState<Game[]>([]);
    const [showHeading, setShowHeading] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number>();
    const { games, getFilteredGames } = useGames();
    const { sortOrder } = useOptions();
    
    useEffect(() => {
        if ((params.title || params.category || params.developer || params.publisher)) {    // Query params (These exists only if a search has already been performed)
            search();                   // Perform a search on query params
        }
    }, [params.title, params.category, params.developer, params.publisher])

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
        const filteredGames = getFilteredGames(params);
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