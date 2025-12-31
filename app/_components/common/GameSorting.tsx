import { ReactElement } from "react";
import { Game } from "@/app/_db/schema/games";

import "./GameSorting.css";

/**
 * Sort games.
 */
export function GameSorting({games, setSortedGames}: {games: Game[], setSortedGames: (games: Game[]) => void}): ReactElement {

    /**
     * Sort games according to selected option.
     */
    function sortGames(sort: string): void {
        const gamesToSort = [...games];

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
        } else if (sort === "categoryAsc") {
            const sorted = gamesToSort.sort((a, b) => a.category.localeCompare(b.category));
            setSortedGames([...sorted]);
        } else if (sort === "categoryDes") {
            const sorted = gamesToSort.sort((a, b) => b.category.localeCompare(a.category));
            setSortedGames([...sorted]);
        }
    }

    return (
        <section id="games-sort">
            <label id="games-sort-label" htmlFor="games-sort-select"> Sort by: </label> 
            <select id="games-sort-select" name="games-sort-select" onChange={e => sortGames(e.target.value)} defaultValue={"titleAsc"}>
                <optgroup className="games-sort-select__options">
                    <option value="categoryAsc"> Category Ascending </option>
                    <option value="categoryDes"> Category Descending </option>
                    <option value="developerAsc"> Developer Ascending </option>
                    <option value="developerDes"> Developer Descending </option>
                    <option value="playersAsc"> Players Ascending </option>
                    <option value="playersDes"> Players Descending </option>
                    <option value="publisherAsc"> Publisher Ascending </option>
                    <option value="publisherDes"> Publisher Descending </option>
                    <option value="titleAsc" defaultChecked> Title Ascending </option>
                    <option value="titleDes"> Title Descending </option>
                </optgroup>
            </select>
        </section>
    )
}