'use client';

import { ReactElement, useRef } from "react";
import { News } from "@/app/_types/types";

import "./NewsList.css";
import {arima} from "@/app/_fonts/fonts";

/**
 * Contains a list of all existing news. Click on the send button after choosing which news to send out to all
 * subscribed email addresses.
 */
export function NewsList({ news }: { news: News[] }): ReactElement {
    const selectRef = useRef<HTMLSelectElement>(null);

    return (
        <section id="newsList" className="selectSection">
            <h2 className={`selectSection__title ${arima.className}`}> News </h2>

            <select name="news" ref={selectRef} className="selectSection__select">
                { news ? news.map((element, index) => <option key={index} value={element.heading}> {element.heading} </option>) : <></> }
            </select>

        </section>
    );
}