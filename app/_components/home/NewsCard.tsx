import { ReactElement } from "react";

export function NewsCard({ text, date }: { text: string, date: string }): ReactElement {
    return (
        <section className="news-card">
            <h2> {text} </h2>
            <h2> {date} </h2>
        </section>
    );
}