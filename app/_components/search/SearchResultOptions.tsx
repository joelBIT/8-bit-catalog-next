import { ReactElement, useState } from "react";
import { useOptions } from "@/app/_hooks";
import { Game } from "@/app/_db/schema/games";
import { GameSorting } from "../common";
import { RangeSlider } from ".";
import { GameListEntry, SlidingToggle } from "../lists";
import { GameCard } from "../games";

import "./SearchResultOptions.css";

/**
 * Various options (sorting, number of items visible, etc) for the search result.
 */
export function SearchResultOptions({searchResult, setSortedGames}: {searchResult: Game[], setSortedGames: (games: Game[]) => void}): ReactElement {
    const { gridView, numberGamesShowing, setNumberGamesShowing } = useOptions();
    const [showOptions, setShowOptions] = useState<boolean>(false);
    
    return (
        <section className="searchResultOptions">
            <section id="result-options-header">
                <button 
                    className="options-button" 
                    onClick={() => setShowOptions(!showOptions)}
                > 
                    <h2 className="options-button-text"> {showOptions ? "Hide options" : "Show options"} </h2> 
                </button>
            </section>

            <section className={showOptions ? "pagination-toggle show-options" : "pagination-toggle hide-options"}>
                <GameSorting games={searchResult} setSortedGames={setSortedGames} />
                
                {searchResult.length >= 30 ? <RangeSlider min={30} max={searchResult.length} setSliderValue={setNumberGamesShowing} /> : <></>}

                {searchResult.length > 0 ? <SlidingToggle /> : <></>}
            </section>

            <section className={gridView ? "grid" : "list"}>
                {
                    searchResult.slice(0, numberGamesShowing).map(game => <>{gridView ? <GameCard game={game} key={game.id}/> : <GameListEntry game={game} key={game.id} /> }</>)
                }
            </section>
        </section>
    );
}