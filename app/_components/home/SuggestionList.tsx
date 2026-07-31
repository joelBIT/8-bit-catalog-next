'use client';

import { ReactElement, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { URL_GAME_PAGE } from "@/app/_utils/utils";
import { useGames } from "@/app/_hooks";

import "./SuggestionList.css";

/**
 * Show suggestions of game titles and navigate to selected game page when button is clicked.
 */
export function SuggestionList({ options }: { options: string[] }): ReactElement {
    const [message, setMessage] = useState<string>("");
    const searchRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { getGameByTitle } = useGames();

    async function viewGame(): Promise<void> {
        const title = searchRef.current?.value;
        if (!title) {
            setMessage("Please enter a title");
            return;
        }

        const game = getGameByTitle(title);
        if (!game) {
            setMessage(`${title} is not a valid title`);
            return;
        }

        router.push(URL_GAME_PAGE + `/${game.id}`);
    }

    return (
        <section id="suggestion-search">
            <input
                id="gameSearch"
                name="gameSearch"
                type="text"
                list="suggestions"
                ref={searchRef}
                placeholder="Game Title"
            />

            <datalist id="suggestions">
                {
                    options.map((title: string) => <option value={title} key={title} />)
                }
            </datalist>

            <section className="button-container">
                <button id="viewButton" className="arrowButton" onClick={() => viewGame()}> <h2>View</h2> <img src="/arrow-right-bg.png" /> </button>
            </section>

            { message.length > 0 ? <h2 className="message-failure"> {message} </h2> : <></> }
        </section>
    );
}