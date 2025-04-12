'use client';

import { ReactElement, useState } from "react";

import "./ListToggle.css";

export function ListToggle({ toggle }: { toggle: () => void } ): ReactElement {
    const [ grid, setGrid ] = useState<boolean>(true);

    function toggleView() {
        setGrid(!grid);
        toggle();
    }

    return (
        <section id="listToggle">
            <article id="gridView" className={grid ? "active" : "disabled"} onClick={toggleView}>
                <span className="material-symbols-outlined"> grid_view </span> <h2 className="toggle-title"> Grid </h2>
            </article>

            <article id="listView" className={!grid ? "active" : "disabled"} onClick={toggleView}>
                <span className="material-symbols-outlined"> view_list </span> <h2 className="toggle-title"> List </h2>
            </article>
        </section>
    );
}