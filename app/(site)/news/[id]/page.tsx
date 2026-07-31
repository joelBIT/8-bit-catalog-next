'use server';

import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { convertDateToString, URL_NEWS_PAGE } from "@/app/_utils/utils";
import { getNewsById, getTopNews } from "@/app/_db/news-db";
import { News } from "@/app/_db/schema/news";
import ErrorPage from "@/app/_components/common/ErrorPage";

import "./page.css";

/**
 * Shows a specific news article corresponding to the supplied news ID.
 */
export default async function NewsPage({params}: {params: Promise<{ id: string }>}): Promise<ReactElement> {
    const { id } = await params;
    let news: News | undefined;
    
    try {
        news = await getNewsById(parseInt(id));
        if (!news) {
            return ( <ErrorPage text={`Could not find news with id ${id}`} /> )
        }
    } catch (error) {
        return ( <ErrorPage text={`Could not load news with id ${id}`} /> )
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

                <section className="news-heading">
                    <h3 className="news-published"> {convertDateToString(new Date(news.published))} </h3>
                    <h2 className="news-title">{news.heading} </h2>
                    <h3 className="news-publisher"> By {news.author} </h3>
                </section>
            </figure>

            <section className="news-content">
                <p className="news-text">
                    {news.text}
                </p>

                <section className="news-lists">
                    <h2 className="top-news-heading"> Other News </h2>

                    <ul className="news-list">
                        {
                            (await getTopNews()).map((news: News) => 
                                <section className="top-news-list" key={news.id}>
                                    <Link 
                                        href={URL_NEWS_PAGE + `/${news.id}`} 
                                        className={`top-news-list__heading ${parseInt(id) == news.id ? "disabled-link" : ""}`}
                                    >
                                        {news.heading}
                                    </Link>
                                    
                                    <li className="list-item">
                                        <h3 className="item-heading"> WRITTEN BY </h3>
                                        <h3 className="item-text"> {news.author} </h3>
                                    </li>

                                    <li className="list-item">
                                        <h3 className="item-heading"> PUBLISHED </h3>
                                        <h3 className="item-text published"> {convertDateToString(new Date(news.published))} </h3>
                                    </li>
                                </section>
                            )
                        }
                    </ul>
                </section>
            </section>

            <div className="darken-image-bottom" />
        </main>
    )
}