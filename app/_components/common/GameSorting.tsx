import { ReactElement } from "react";
import { useGames } from "@/app/_hooks";
import { Game } from "@/app/_db/schema/games";
import { SortOrder } from "@/app/_types/types";
import { sortGames } from "@/app/_utils/utils";

import "./GameSorting.css";

/**
 * Sort games. The chosen sort order is stored in the games context so a user is able to navigate the site without the sort order resetting.
 */
export function GameSorting({games, setSortedGames}: {games: Game[], setSortedGames: (games: Game[]) => void}): ReactElement {
    const { sortOrder, setSortOrder } = useGames();

    /**
     * Sort games according to selected option.
     */
    function sortGamesByOrder(sort: SortOrder): void {
        setSortOrder(sort);
        const gamesToSort = [...games];
        setSortedGames([...sortGames(gamesToSort, sort)]);
    }

    return (
        <section id="games-sort">
            <label id="games-sort-label" htmlFor="games-sort-select"> Sort by: </label> 
            <select id="games-sort-select" name="games-sort-select" onChange={e => sortGamesByOrder(e.target.value as SortOrder)} defaultValue={sortOrder}>
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