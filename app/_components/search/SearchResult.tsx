'use client';

import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGames, useOptions } from "@/app/_hooks";
import { Game } from "@/app/_db/schema/games";
import { ScrollTopButton } from "@/app/_components/common";
import { GameCard } from "@/app/_components/games";
import { GameListEntry } from "@/app/_components/lists";
import { SearchResultOptions } from "@/app/_components/search";
import { sortGames } from "@/app/_utils/utils";

import "./SearchResult.css";

export function SearchResult(): ReactElement {
    const { games, filteredGames, filterGames } = useGames();
    const { sortOrder, numberGamesShowing, gridView } = useOptions();
    const [searchResult, setSearchResult] = useState<Game[]>(sortGames(filteredGames, sortOrder));      // Filtered games are set so that scroll position is the same when navigating back from game page via browser button
    const [showHeading, setShowHeading] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const title = params.get('title') || '';
    const category = params.get('category') as string;
    const developer = params.get('developer') as string;
    const publisher = params.get('publisher') as string;

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
        const filteredGames = filterGames({title, category, developer, publisher});
        setSearchResult(sortGames(filteredGames, sortOrder));
        setShowHeading(true);           // Set to true after first search is executed
    }

    let content = <> { showHeading ? <h1 className="search-result-text message-failure"> No games found </h1> : <></> } </>;

    if (searchResult.length > 0) {
        content = <>
            <h1 className="search-result-text message-success"> {`Found ${searchResult.length} game${searchResult.length > 1 ? "s" : ""}`} </h1>
            <SearchResultOptions searchResult={searchResult} setSortedGames={setSearchResult} />
        </>
    }

    return (
        <section id="search">
            {content}

            <section className={gridView ? "grid" : "list"}>
                {
                    searchResult.slice(0, numberGamesShowing).map(game => <>{gridView ? <GameCard game={game} key={game.id}/> : <GameListEntry game={game} key={game.id} /> }</>)
                }
            </section>
                
            <ScrollTopButton />
        </section>
    );
}