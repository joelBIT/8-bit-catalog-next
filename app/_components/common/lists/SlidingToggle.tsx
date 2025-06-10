'use client';

import { ReactElement, useContext, useState } from "react";
import { GameContext } from "@/app/_contexts";
import { useSearchParams } from "next/navigation";
import { Game } from "@/app/_types/types";

import "./SlidingToggle.css";

/**
 * This is the UI component for toggling between Grid and List views. The lists themselves are changed outside of this component.
 */
export function SlidingToggle(): ReactElement {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { gridView, toggleGridView, setSelectedGame } = useContext(GameContext);
    const [ grid, setGrid ] = useState<boolean>(gridView);

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