'use client';

import { ReactElement, useRef } from "react";

import "./SuggestionList.css";

/**
 * Show suggestions of game titles and return selected game title when clicked.
 */
export function SuggestionList({ options, setGameTitle }: { options: string[], setGameTitle: (title: string) => void }): ReactElement {
    const searchRef = useRef<HTMLInputElement>(null);

    function selectGame(): void {
        setGameTitle(searchRef.current?.value ?? "");
    }

    return (
        <section id="suggestion-search">
            <input
                id="gameSearch"
                type="text"
                list="suggestions"
                ref={searchRef}
                placeholder="Game Title"
            />

            <datalist id="suggestions">
                {
                    options.map(title => <option value={title} key={title} />)
                }
            </datalist>

            <button id="viewButton" className="arrowButton" onClick={selectGame}> <h2>View</h2> <img src="/arrow-right-bg.png" /> </button>
        </section>
    );
}