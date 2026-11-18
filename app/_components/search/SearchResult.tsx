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
    const { filteredGames, isLoading, loadError, reloadGames, filterGames } = useGames();
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

    useEffect(() => {
        if (hasSearch && !isLoading && !loadError) {
            search();
        }
    }, [hasSearch, isLoading, loadError, title, category, developer, publisher]);

    /**
     * Performs a search based on given title text and filters.
     */
    function search(): void {
        const result = filterGames({title, category, developer, publisher});
        setSearchResult(sortGames(result, sortOrder));
    }

    let content = <></>;

    if (loadError) {
        content = <>
            <p role="alert" className="search-result-text message-failure"> Could not load games. </p>
            <button type="button" className="authButton" onClick={reloadGames}>
                <span className="authButton__text"> Try again </span>
            </button>
        </>;
    } else if (hasSearch && isLoading && searchResult.length === 0) {
        content = <p role="status" className="search-result-text"> Loading games... </p>;
    } else if (searchResult.length > 0) {
        content = <>
            <h1 className="search-result-text message-success"> {`Found ${searchResult.length} game${searchResult.length > 1 ? "s" : ""}`} </h1>
            <SearchResultOptions searchResult={searchResult} setSortedGames={setSearchResult} />
        </>;
    } else if (hasSearch) {
        content = <h1 className="search-result-text message-failure"> No games found </h1>;
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