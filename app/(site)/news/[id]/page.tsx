'use server';

import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { URL_HOME, URL_NEWS_PAGE } from "@/app/_utils/utils";
import { getNewsById, getTopNews } from "@/app/_db/news-db";
import { News } from "@/app/_db/schema/news";

import "./page.css";

/**
 * Shows a specific news article corresponding to the supplied news ID.
 */
export default async function NewsPage({params}: {params: Promise<{ id: string }>}): Promise<ReactElement> {
    const { id } = await params;
    let news: News | undefined;
    
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
            <figure id="news-figure">
                <Image 
                    src={`${URL_NEWS_PAGE}/${news.image}`} 
                    className="news-image" 
                    alt="News Image" 
                    width={1228} 
                    height={480} 
                    loading="eager" 
                    placeholder="blur"
                    blurDataURL={`${URL_NEWS_PAGE}/${news.image}`}
                />
            </figure>

            <section className="news-content">
                <article id="news-article">
                    <h2 className="news-heading"> {news.heading} </h2>
                    
                    <p className="news-text">
                        {news.text}
                    </p>
                </article>

                <article id="top-news">
                    <section className="news-text-author">
                        <article title="Author">
                            <span className="material-symbols-outlined article-person"> article_person </span>
                            <h3 className="news-author"> {news.author} </h3>
                        </article>

                        <article title="Published">
                            <span className="material-symbols-outlined"> calendar_month </span>
                            <h3 className="news-published"> {new Date(news.published).toDateString()} </h3>
                        </article>
                    </section>

                    <h2 className="top-news-heading"> Top News </h2>

                    {
                        (await getTopNews()).map((news: News, index: number) => 
                            <section className="top-news-list" key={news.id}>
                                <Link 
                                    href={URL_NEWS_PAGE + `/${news.id}`} 
                                    className={`top-news-list__heading ${parseInt(id) == news.id ? "disabled-link" : ""}`}
                                >
                                    {news.heading}
                                </Link>
                                
                                <article className="top-news-list__calendar">
                                    <span className="material-symbols-outlined"> calendar_month </span>
                                    <h3 className="top-news-published">{new Date(news.published).toDateString()}</h3>
                                </article>

                                <h2 className="top-news-list-number">{"0" + (index + 1)}</h2>
                            </section>
                        )
                    }
                </article>
            </section>

            <div className="darken-image-bottom" />
        </main>
    )
}