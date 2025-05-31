'use client';

import { ReactElement, useContext, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GameContext } from "@/app/_contexts";

import "./ListToggle.css";

/**
 * This is the UI component for toggling between Grid and List views. The lists themselves are changed outside of this component.
 */
export function ListToggle(): ReactElement {
    const { gridView, toggleGridView } = useContext(GameContext);
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const [ grid, setGrid ] = useState<boolean>(gridView);
    const GRID = "Grid";
    const LIST = "List";

    /**
     * Only toggle if the user clicks on Grid when in List-mode or clicks on List when in Grid-mode.
     * The toggle should not be performed when clicking on the already active option.
     */
    function toggleView(target: string) {
        if (target === GRID && !grid || target === LIST && grid) {
            setGrid(!grid);
            params.delete('show');
            window.history.pushState(null, '', `?${params.toString()}`);        // Remove 'show' so no modal is active when changing games list view
            toggleGridView();
        }
    }

    return (
        <section id="listToggle">
            <article id="gridView" className={grid ? "active" : "disabled"} onClick={() => toggleView(GRID)}>
                <span className="material-symbols-outlined"> grid_view </span> <h2 className="toggle-title"> {GRID} </h2>
            </article>

            <article id="listView" className={!grid ? "active" : "disabled"} onClick={() => toggleView(LIST)}>
                <span className="material-symbols-outlined"> view_list </span> <h2 className="toggle-title"> {LIST} </h2>
            </article>
        </section>
    );
}