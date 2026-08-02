'use server';

import { Suspense, type ReactElement } from "react";
import { Logo, Newsletter, SuggestionList, NewsCard } from "@/app/_components/home";
import { getAllTitles } from "../_db/games-db";
import { getAllNews } from "../_db/news-db";
import { News } from "../_db/schema/news";

import "./page.css";

/**
 * Landing page of the application.
 */
export default async function Home(): Promise<ReactElement> {

    return (
        <main id="landingPage">
            <section id="firstSection">
                <section id="catalogDescription">
                    <h1 className="welcome-text">
                        Welcome to
                        <hr className="line" />
                    </h1>
                    
                    <Logo />

                    <section id="searchGameArea">
                        <p className="search-text">Choose among approximately <b>1000</b> games released for the <b>Nintendo Entertainment System</b></p>
                        <Suspense>
                            <SuggestionList options={await getAllTitles()} />
                        </Suspense>
                    </section>
                </section>
            </section>

            <section id="secondSection">
                <h2 className="recent-news__heading">
                    Most recent news
                </h2>

                <section id="newsCards">
                    {
                        (await getAllNews()).map((news: News) => <NewsCard key={news.text} news={news} />)
                    }
                </section>
            </section>

            <Newsletter />
            <div className="darken-image-bottom" />
        </main>
    );
}
