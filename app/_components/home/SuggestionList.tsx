'use client';

import { ReactElement } from "react";
import { arima } from "@/app/_fonts/fonts";

import "./SuggestionList.css";

/**
 * Show suggestions of game titles and open a Game Modal showing game details when clicked.
 */
export function SuggestionList({ options }: { options: string[]}): ReactElement {
    return (
        <>
            <section id="suggestion-search">
                <input
                    id="gameSearch"
                    type="text"
                    list="suggestions"
                    className={arima.className}
                    placeholder="Game Title"
                />
                <datalist id="suggestions">
                    {
                        options.map(title => <option value={title} key={title} />)
                    }
                </datalist>

                <button id="viewButton" className="button__link"> View </button>
            </section>
        </>
    );
}