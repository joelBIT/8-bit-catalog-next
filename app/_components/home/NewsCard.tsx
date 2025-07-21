import { ReactElement } from "react";

import "./NewsCard.css";

export function NewsCard({ text, date, heading }: { text: string, date: Date, heading: string }): ReactElement {
    return (
        <section className="news-card">
            <h2 className="news-date"> {date} </h2>
            <h2 className="news-heading"> {heading} </h2>
            <h2 className="news-text"> {text} </h2>
        </section>
    );
}