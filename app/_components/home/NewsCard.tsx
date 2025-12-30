import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { News } from "@/app/_types/types";
import { adjustTextLength, URL_NEWS_PAGE } from "@/app/_utils/utils";

import "./NewsCard.css";

/**
 * A news card on the landing page.
 */
export function NewsCard({ news }: { news: News }): ReactElement {

    return (
        <section className="news-card">
            <Image src={`/news/${news.image}`} alt="News Card image" className="news-card-image" width={200} height={200} />
            <div className="darken-image-right" />

            <section className="news-card-text">
                <section className="news-card-title">
                    <h2 className="news-heading"> {news.heading} </h2>
                    <h2 className="news-date"> {news.published?.toString()} </h2>
                </section>

                <h2 className="news-text"> {adjustTextLength(news.text, 200)} </h2>
                <Link href={URL_NEWS_PAGE + `/${news.id}`} className="news-read-button"> Read More </Link>
            </section>
        </section>
    );
}