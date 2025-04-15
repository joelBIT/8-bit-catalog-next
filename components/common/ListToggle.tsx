'use client';

import { ReactElement, useState } from "react";

import "./ListToggle.css";

/**
 * This is the UI component for toggling between Grid and List views. The lists themselves are changed outside of this component.
 * The 'initialState' parameter corresponds to the initial state of the component.
 */
export function ListToggle({ toggle, initialState }: { toggle: () => void, initialState: boolean } ): ReactElement {
    const [ grid, setGrid ] = useState<boolean>(initialState);
    const GRID = "Grid";
    const LIST = "List";

    /**
     * Only toggle if the user clicks on Grid when in List-mode or clicks on List when in Grid-mode.
     * The toggle should not be performed when clicking on the already active option.
     */
    function toggleView(target: string) {
        if (target === GRID && !grid || target === LIST && grid) {
            setGrid(!grid);
            toggle();
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