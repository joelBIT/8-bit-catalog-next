import { ReactElement, useEffect, useState } from "react";
import { useGames } from "@/app/_hooks";
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
    const [numberGamesShowing, setNumberGamesShowing] = useState<number>(50);
    const [games, setGames] = useState<Game[]>(searchResult.slice(0, numberGamesShowing));
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const { gridView } = useGames();

    useEffect(() => {
        setGames(searchResult.slice(0, numberGamesShowing));
    }, [searchResult, numberGamesShowing]);
    
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
                <GameSorting games={games} setSortedGames={setSortedGames} />
                
                {searchResult.length > 80 ? <RangeSlider min={50} max={searchResult.length} setSliderValue={setNumberGamesShowing} /> : <></>}

                {games.length > 0 ? <SlidingToggle /> : <></>}
            </section>

            <section className={gridView ? "grid" : "list"}>
                {
                    games.map(game => <>{gridView ? <GameCard game={game} key={game.id}/> : <GameListEntry game={game} key={game.id} /> }</>)
                }
            </section>
        </section>
    );
}