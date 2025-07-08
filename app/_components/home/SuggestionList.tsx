'use client';

import { ReactElement, useRef } from "react";
import { arima } from "@/app/_fonts/fonts";

import "./SuggestionList.css";

/**
 * Show suggestions of game titles and open a Game Modal showing game details when clicked.
 */
export function SuggestionList({ options }: { options: string[]}): ReactElement {
    const searchRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <section id="suggestion-search">
                <input
                    id="gameSearch"
                    type="text"
                    list="suggestions"
                    ref={searchRef}
                    className={arima.className}
                    placeholder="Game Title"
                />
                <datalist id="suggestions">
                    {
                        options.map(title => <option value={title} key={title} />)
                    }
                </datalist>

                <button id="viewButton" className="button__link" onClick={() => console.log(searchRef.current.value)}> View </button>
            </section>
        </>
    );
}