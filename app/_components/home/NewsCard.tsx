import { ReactElement } from "react";
import Link from "next/link";
import { News } from "@/app/_db/schema/news";
import { URL_NEWS_PAGE } from "@/app/_utils/utils";

import "./NewsCard.css";

/**
 * A news card on the landing page.
 */
export function NewsCard({ news }: { news: News }): ReactElement {

    return (
        <section className="newsCard">
            <Link href={URL_NEWS_PAGE + `/${news.id}`} className="news-image-link" title={`News about ${news.heading}`}>
                <article className="news-image-container">
                    <img src={`/news/${news.image}`} alt="News Card image" className="news-image" />
                </article>
            </Link>

            <section className="content">
                <h1 className="content-title">{ news.heading }</h1>

                <p className="news-date">
                    <span className="material-symbols-outlined"> calendar_month </span>
                    {new Date(news.published).toDateString()} 
                </p>

                <p className="content-text">{ news.text.slice(0, 100) + "..." }</p>
            </section>
            
            <section className="news-bottom">
                <Link href={URL_NEWS_PAGE + `/${news.id}`} className="news-link">
                    READ MORE
                </Link>
            </section>
        </section>
    );
}