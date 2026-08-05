'use client';

import { ReactElement, useLayoutEffect} from "react";
import { LayoutGrid, List } from "lucide-react";
import { useGame } from "@/app/_hooks";
import { Game } from "@/app/_db/schema/games";

import "./SlidingToggle.css";

/**
 * Used for toggling between Grid and List views. The view state is kept in the GameContext and is used in different places in the application.
 */
export function SlidingToggle(): ReactElement {
    const { gridView, toggleGridView, setSelectedGame } = useGame();

    useLayoutEffect(() => {
        const container: HTMLDivElement | null = document.querySelector(".toggle");
        if (!gridView && container) {
            container.style.setProperty("--bg-offset", `50%`);
        }
    }, [gridView]);

    function slideBackground(n: number) {
        const container: HTMLDivElement | null = document.querySelector(".toggle");
        if (container) {
            container.style.setProperty("--bg-offset", `${50 * n}%`);
            setSelectedGame({} as Game);
            toggleGridView();
        }
    }

    return (
        <div className='toggle'>
            <button onClick={() => slideBackground(0)}>
                <LayoutGrid size={20} color="#ffffff" />
            </button>

            <button onClick={() => slideBackground(1)}>
                <List size={20} color="#ffffff" />
            </button>
        </div>
    );
}