import { ReactElement } from "react";

export function NewsCard({ text, date }: { text: string, date: Date }): ReactElement {
    return (
        <section className="news-card">
            <h2> {text} </h2>
            <h2> {date?.toDateString()} </h2>
        </section>
    );
}