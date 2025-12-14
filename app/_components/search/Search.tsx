'use client';

import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGame, useGames } from "@/app/_hooks";
import { Game } from "@/app/_types/types";
import { GameSorting, ScrollTopButton } from "../common";
import { RangeSlider } from ".";
import { GameGrid, GameList, SlidingToggle } from "../lists";

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
    const [numberGamesShowing, setNumberGamesShowing] = useState<number>(50);           // Minimum 50 games visible
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
        const filteredGames = getFilteredGames({title, category, developer, publisher});
        setSearchResult(filteredGames);
        setTotalCount(filteredGames.length);
        setShowHeading(true);           // Set to true after first search is executed
    }

    return (
        <section id="search">
            {
                searchResult.length > 0 ? 
                    <>
                        <h1 className="search-result-text"> {`Found ${totalCount} game${searchResult.length > 1 ? "s" : ""}`} </h1>
                        <section className="show-pagination-toggle">
                            <GameSorting games={searchResult} setSortedGames={setSearchResult}/>
                            
                            {searchResult.length > 80 ? <RangeSlider min={50} max={searchResult.length} setSliderValue={setNumberGamesShowing} /> : <></>}

                            {searchResult.length > 0 ? <SlidingToggle /> : <></>}
                        </section>

                        { 
                            gridView ?
                                <GameGrid games={searchResult.slice(0, numberGamesShowing)} />
                                :
                                <GameList games={searchResult.slice(0, numberGamesShowing)} />
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