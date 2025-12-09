'use client';

import { ReactElement, useRef, useState } from "react";
import { sendNewsLetter } from "@/app/_client/client";
import { News } from "@/app/_types/types";

import "./NewsList.css";

/**
 * Contains a list of all existing news. Click on the send button after choosing which news to send out to all
 * subscribed email addresses.
 */
export function NewsList({ news }: { news: News[] }): ReactElement {
    const [isDisabled, setDisabled] = useState<boolean>(true);
    const [allNews] = useState<News[]>(news ?? []);
    const selectRef = useRef<HTMLSelectElement>(null);
    const NONE_CHOSEN = "none";

    function sendNewsletter() {
        sendNewsLetter(allNews.filter(news => news.heading === selectRef.current?.value)[0]);
    }

    return (
        <section id="newsList" className="selectSection">
            <button id="sendNewsletterButton" className="button__link" disabled={isDisabled} onClick={sendNewsletter}>
                Send Newsletter
            </button>

            <h2 className="selectSection__title"> Choose Newsletter </h2>

            <select
                name="news"
                ref={selectRef}
                className="selectSection__select"
                onChange={() => setDisabled(selectRef.current?.value === NONE_CHOSEN)}
            >
                <option key={NONE_CHOSEN} value={NONE_CHOSEN}> --- </option>
                { news ? news.map((element, index) => <option key={index} value={element.heading}> {element.heading} </option>) : <></> }
            </select>
        </section>
    );
}