import { ReactElement, useState } from "react";
import { useGame } from "@/app/_hooks";
import { Game } from "@/app/_db/schema/games";
import { GameSorting } from "../common";
import { RangeSlider } from ".";
import { GameGrid, GameList, SlidingToggle } from "../lists";

import "./SearchResultOptions.css";

/**
 * Various options (sorting, number of items visible, etc) for the search result.
 */
export function SearchResultOptions({searchResult, setSortedGames}: {searchResult: Game[], setSortedGames: (games: Game[]) => void}): ReactElement {
    const [numberGamesShowing, setNumberGamesShowing] = useState<number>(50);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const { gridView } = useGame();
    
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
                
                {searchResult.length > 80 ? <RangeSlider min={50} max={searchResult.length} setSliderValue={setNumberGamesShowing} /> : <></>}

                {searchResult.length > 0 ? <SlidingToggle /> : <></>}
            </section>

            { 
                gridView ?
                    <GameGrid games={searchResult.slice(0, numberGamesShowing)} />
                    :
                    <GameList games={searchResult.slice(0, numberGamesShowing)} />
            }
        </section>
    );
}