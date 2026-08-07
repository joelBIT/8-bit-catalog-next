'use client';

import { ReactElement, useLayoutEffect} from "react";
import { LayoutGrid, List } from "lucide-react";
import { useOptions } from "@/app/_hooks";

import "./SlidingToggle.css";

/**
 * Used for toggling between Grid and List views. The view state is kept in the GameContext and is used in different places in the application.
 */
export function SlidingToggle(): ReactElement {
    const { gridView, toggleGridView } = useOptions();

    useLayoutEffect(() => {
        const container: HTMLDivElement | null = document.querySelector(".toggle");
        if (!gridView && container) {
            container.style.setProperty("--bg-offset", `52%`);
        }
    }, [gridView]);

    function slideBackground(n: number) {
        const container: HTMLDivElement | null = document.querySelector(".toggle");
        if (container) {
            container.style.setProperty("--bg-offset", `${6 + (50 * n)}%`);
            toggleGridView();
        }
    }

    return (
        <div className='toggle'>
            <button onClick={() => slideBackground(0)} disabled={gridView}>
                <LayoutGrid size={20} color="#ffffff" />
            </button>

            <button onClick={() => slideBackground(1)} disabled={!gridView}>
                <List size={20} color="#ffffff" />
            </button>
        </div>
    );
}