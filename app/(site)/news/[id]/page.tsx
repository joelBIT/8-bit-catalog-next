'use server';

import { ReactElement } from "react";
import Link from "next/link";
import { getNewsById, getTopNews } from "@/app/_db/db";
import { URL_HOME, URL_NEWS_PAGE } from "@/app/_utils/utils";

import "./page.css";

/**
 * Shows a specific news article corresponding to the supplied news ID.
 */
export default async function NewsPage({params}: {params: Promise<{ id: string }>}): Promise<ReactElement> {
    const { id } = await params;
    let news;
    try {
        news = await getNewsById(parseInt(id));
    } catch (error) {
        return (
            <main id="newsPage">
                <h2 className="newsPage-error"> Could not load news </h2>
                <Link href={URL_HOME} className='not-found__link'> Return Home </Link>
            </main>
        )
    }

    return (
        <main id="newsPage">
            <section id="news-top">
                <img src={`/${news.image}`} className="news-top-image" />
                <div className="darken-image-bottom" />

                <section className="news-top-content">
                    <span className="material-symbols-outlined"> breaking_news </span>
                    <h3 className="news-subheading"> In the spotlight </h3>
                    <h2 className="news-heading"> {news.heading} </h2>
                </section>
            </section>

            <section id="news-bottom">
                <article id="top-news">
                    <h2 className="top-news-heading"> Top News </h2>

                    {
                        (await getTopNews()).map((news, index) => 
                            <section className="top-news-list" key={news.id}>
                                <Link 
                                    href={URL_NEWS_PAGE + `/${news.id}`} 
                                    className={`top-news-list__heading ${parseInt(id) === news.id ? "disabled-link" : ""}`}
                                >
                                    {news.heading}
                                </Link>
                                
                                <article className="top-news-list__calendar">
                                    <span className="material-symbols-outlined"> calendar_month </span>
                                    {news.date.toString()}
                                </article>

                                <h2 className="top-news-list-number">{index + 1}</h2>
                            </section>
                        )
                    }
                </article>

                <article id="news-text">
                    <section className="news-text-author">
                        <article>
                            <span className="material-symbols-outlined article-person"> article_person </span>
                            <h3 className="news-author"> {news.author} </h3>
                        </article>

                        <article>
                            <span className="material-symbols-outlined"> calendar_month </span>
                            {news.date.toString()}
                        </article>
                    </section>
                    {news.text}
                </article>
            </section>
        </main>
    )
}