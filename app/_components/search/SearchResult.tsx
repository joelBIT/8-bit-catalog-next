'use client';

import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGames, useOptions } from "@/app/_hooks";
import { Game } from "@/app/_db/schema/games";
import { ScrollTopButton } from "@/app/_components/common";
import { GameCard } from "@/app/_components/games";
import { GameListEntry } from "@/app/_components/lists";
import { SearchResultOptions } from "@/app/_components/search";
import { ALL_OPTION_VALUE, SEARCH_KEYS, sortGames } from "@/app/_utils/utils";

import "./SearchResult.css";

export function SearchResult(): ReactElement {
    const { games, filteredGames, isLoading, loadError, reloadGames, filterGames } = useGames();
    const { sortOrder, numberGamesShowing, gridView } = useOptions();

    const searchParams = useSearchParams();
    const title = searchParams.get('title') ?? '';
    const category = searchParams.get('category') ?? ALL_OPTION_VALUE;
    const developer = searchParams.get('developer') ?? ALL_OPTION_VALUE;
    const publisher = searchParams.get('publisher') ?? ALL_OPTION_VALUE;
    const hasSearch = SEARCH_KEYS.some(key => searchParams.has(key));       // true only after a search has been submitted

    // Reuse the stored results only when the URL describes a search (e.g. browser Back from a game page).
    // On a plain /search visit there is nothing to restore, so start empty.
    const [searchResult, setSearchResult] = useState<Game[]>(() => hasSearch ? sortGames(filteredGames, sortOrder) : []);
    // Identifies "this search on this data". games.length changes when the games finish loading.
    const searchKey = JSON.stringify([title, category, developer, publisher, games.length]);
    const [searchedKey, setSearchedKey] = useState<string>('');
    const resultsAreCurrent = searchedKey === searchKey;

    useEffect(() => {
        if (hasSearch && !isLoading && !loadError) {
            search();
        }
    }, [hasSearch, isLoading, loadError, searchKey]);

    /**
     * Performs a search based on given title text and filters.
     */
    function search(): void {
        const result = filterGames({title, category, developer, publisher});
        setSearchResult(sortGames(result, sortOrder));
        setSearchedKey(searchKey);          // these results belong to this key
    }

    let content = <></>;

    if (loadError) {
        content = <>
            <p role="alert" className="search-result-text message-failure"> Could not load games. </p>
            <button type="button" className="authButton" onClick={reloadGames}>
                <span className="authButton__text"> Try again </span>
            </button>
        </>;
    } else if (searchResult.length > 0) {
        content = <>
            <h1 className="search-result-text message-success"> {`Found ${searchResult.length} game${searchResult.length > 1 ? "s" : ""}`} </h1>
            <SearchResultOptions searchResult={searchResult} setSortedGames={setSearchResult} />
        </>;
    } else if (hasSearch && resultsAreCurrent) {
        content = <h1 className="search-result-text message-failure"> No games found </h1>;     // only when the search really ran on the loaded games
    } else if (hasSearch) {
        content = <p role="status" className="search-result-text"> {isLoading ? 'Loading games...' : 'Searching...'} </p>;
    }

    return (
        <section id="search">
            {content}

            <section className={gridView ? "grid" : "list"}>
                {
                    searchResult.slice(0, numberGamesShowing).map(game => gridView ? <GameCard game={game} key={game.id}/> : <GameListEntry game={game} key={game.id} />)
                }
            </section>
                
            <ScrollTopButton />
        </section>
    );
}