'use client';

import { ReactElement, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGame } from "@/app/_hooks";
import { Game } from "@/app/_db/schema/games";

import "./SlidingToggle.css";

/**
 * Used for toggling between Grid and List views. The view state is kept in the GameContext and is used in different places in the application.
 */
export function SlidingToggle(): ReactElement {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { gridView, toggleGridView, setSelectedGame } = useGame();
    const [grid, setGrid] = useState<boolean>(gridView);

    function toggleView(): void {
        setSelectedGame({} as Game);

        if (grid) {
            setGrid(!grid);
            params.delete('show');
            window.history.pushState(null, '', `?${params.toString()}`);        // Remove 'show' so no modal is active when changing games list view
            toggleGridView();
        } else {
            setGrid(!grid);
        }
    }

    return (
        <label id="slidingToggle" className="toggle" htmlFor="toggle-input" onClick={toggleView}>
            <input id="toggle-input" name="toggle-input" type="checkbox" defaultChecked={gridView}/>
            <span className="slider" />
            <span className="labels" toggle-off="List" toggle-on="Grid" />
        </label>
    );
}