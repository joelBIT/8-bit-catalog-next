import { ReactElement } from "react";
import Link from "next/link";
import { News } from "@/app/_types/types";
import { URL_NEWS_PAGE } from "@/app/_utils/utils";

import "./NewsCard.css";

/**
 * A news card on the landing page.
 */
export function NewsCard({ news }: { news: News }): ReactElement {

    /**
     * Text in card should not be longer than 200 characters. If it is, replace the remaining characters with three dots.
     */
    function adjustLength(text: string): string {
        if (text.length > 200) {
            return text.slice(0, 200) + "...";
        }

        return text;
    }

    return (
        <section className="news-card">
            <img src={`/${news.image}`} />
            <div className="darken-image-right" />

            <section className="news-card-text">
                <section className="news-card-title">
                    <h2 className="news-heading"> {news.heading} </h2>
                    <h2 className="news-date"> {news.date.toString()} </h2>
                </section>

                <h2 className="news-text"> {adjustLength(news.text)} </h2>
                <Link href={URL_NEWS_PAGE + `/${news.id}`} className="news-read-button"> Read More </Link>
            </section>
        </section>
    );
}