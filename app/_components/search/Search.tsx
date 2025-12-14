'use client';

import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGame, useGames } from "@/app/_hooks";
import { Game } from "@/app/_types/types";
import { ScrollTopButton } from "../common";
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
    const [sortedGames, setSortedGames] = useState<Game[]>(searchResult);
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
        setSortedGames(filteredGames);
        setTotalCount(filteredGames.length);
        setShowHeading(true);           // Set to true after first search is executed
    }

     /**
     * Sort games according to selected option.
     */
    function sortGames(sort: string): void {
        const gamesToSort = [...sortedGames];

        if (sort === "titleAsc") {
            const sorted = gamesToSort.sort((a, b) => a.title.localeCompare(b.title));
            setSortedGames([...sorted]);
        } else if (sort === "titleDes") {
            const sorted = gamesToSort.sort((a, b) => b.title.localeCompare(a.title));
            setSortedGames([...sorted]);
        } else if (sort === "playersAsc") {
            const sorted = gamesToSort.sort((a, b) => a.players - b.players);
            setSortedGames([...sorted]);
        } else if (sort === "playersDes") {
            const sorted = gamesToSort.sort((a, b) => b.players - a.players);
            setSortedGames([...sorted]);
        } else if (sort === "publisherAsc") {
            const sorted = gamesToSort.sort((a, b) => a.publisher.localeCompare(b.publisher));
            setSortedGames([...sorted]);
        } else if (sort === "publisherDes") {
            const sorted = gamesToSort.sort((a, b) => b.publisher.localeCompare(a.publisher));
            setSortedGames([...sorted]);
        } else if (sort === "developerAsc") {
            const sorted = gamesToSort.sort((a, b) => a.developer.localeCompare(b.developer));
            setSortedGames([...sorted]);
        } else if (sort === "developerDes") {
            const sorted = gamesToSort.sort((a, b) => b.developer.localeCompare(a.developer));
            setSortedGames([...sorted]);
        }
    }

    return (
        <section id="search">
            {
                searchResult.length > 0 ? 
                    <>
                        <h1 className="search-result-text"> {`Found ${totalCount} game${searchResult.length > 1 ? "s" : ""}`} </h1>
                        <section className="show-pagination-toggle">
                            <section id="games-sort">
                                <label id="games-sort-label" htmlFor="games-sort-select"> Sort by: </label> 
                                <select id="games-sort-select" name="games-sort-select" onChange={e => sortGames(e.target.value)}>
                                    <optgroup className="games-sort-select__options">
                                        <option value="titleAsc" defaultChecked> Title Ascending </option>
                                        <option value="titleDes"> Title Descending </option>
                                        <option value="playersAsc"> Players Ascending </option>
                                        <option value="playersDes"> Players Descending </option>
                                        <option value="publisherAsc"> Publisher Ascending </option>
                                        <option value="publisherDes"> Publisher Descending </option>
                                        <option value="developerAsc"> Developer Ascending </option>
                                        <option value="developerDes"> Developer Descending </option>
                                    </optgroup>
                                </select>
                            </section>
                            
                            {searchResult.length > 80 ? <RangeSlider min={50} max={searchResult.length} setSliderValue={setNumberGamesShowing} /> : <></>}

                            {searchResult.length > 0 ? <SlidingToggle /> : <></>}
                        </section>

                        { 
                            gridView ?
                                <GameGrid games={sortedGames.slice(0, numberGamesShowing)} />
                                :
                                <GameList games={sortedGames.slice(0, numberGamesShowing)} />
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