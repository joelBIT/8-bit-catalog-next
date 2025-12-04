'use client';

import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGame, useGames } from "@/app/_hooks";
import { Game } from "@/app/_types/types";
import { SlidingToggle, ScrollTopButton, GameList, GameGrid } from "../common";

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
    const [ searchResult, setSearchResult ] = useState<Game[]>([]);
    const [ showHeading, setShowHeading ] = useState<boolean>(false);
    const [ totalCount, setTotalCount ] = useState<number>();
    const { getFilteredGames } = useGames();
    const { gridView } = useGame();
    
    useEffect(() => {
        if ((title || category || developer || publisher)) {    // Query params
            search();                   // Perform a search on query params
        }
    }, [title, category, developer, publisher])

    /**
     * Performs a search based on given title text and filters.
     */
    async function search(): Promise<void> {
        const filteredGames = getFilteredGames({title, category, developer, publisher, page: "1"});
        setSearchResult(filteredGames);
        setTotalCount(filteredGames.length);
        setShowHeading(true);
    }

    return (
        <section id="search">
            {
                searchResult.length > 0 ? 
                    <>
                        <h1 className="search-result-text"> {`Found ${totalCount} game${searchResult.length > 1 ? "s" : ""}`} </h1>
                        <section className="show-pagination-toggle">
                            <div className="invisible" />

                            { searchResult.length > 0 ? <SlidingToggle /> : <></> }
                        </section>

                        { 
                            gridView ?
                                <GameGrid games={searchResult} page={1} />
                                :
                                <GameList games={searchResult} page={1} />
                        }
                    </>
                :   <>
                        { 
                            showHeading ? 
                                <h1 className="search-result-text"> No games found </h1>
                            : <></>
                        }
                    </>   
            }
        
            <ScrollTopButton />
        </section>
    );
}