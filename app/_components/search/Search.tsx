'use client';

import { ReactElement, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGames } from "@/app/_hooks/useGames";
import { GameContext } from "@/app/_contexts";
import { Game } from "@/app/_types/types";
import { SlidingToggle, ScrollTopButton, GameList, GameGrid } from "../common";

import "./Search.css";

/**
 * Searches for games that matches the supplied filter values as well as the given title text.
 * The searchResult state contains the games that matches the search query. The showHeading state
 * is set on each search to inform the user about how many games that matches the search query.
 */
export function Search(): ReactElement {
    const { gridView } = useContext(GameContext);
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
    
    useEffect(() => {
        if ((title || category || developer || publisher)) {    // Query params
            search();                   // Perform a search on query params
        }
    }, [title, category, developer, publisher])

    /**
     * Performs a search based on given title text and filters. The search is executed either
     * when the button is pressed or when the Enter key is pressed in the input field.
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