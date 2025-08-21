import { JSX } from "react";

import "./NewsCard.css";

export function NewsCard({ text, date, heading }: { text: string, date: Date, heading: string }): JSX.Element {
    return (
        <section className="news-card">
            <h2 className="news-date"> {date.toString()} </h2>
            <h2 className="news-heading"> {heading} </h2>
            <h2 className="news-text"> {text} </h2>
        </section>
    );
}