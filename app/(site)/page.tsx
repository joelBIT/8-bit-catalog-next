'use server';

import { Suspense, type ReactElement } from "react";
import { TopicSelection, Logo, TitleSearch, Newsletter } from "@/app/_components/home";
import { getAllTitles } from "../_db/games-db";
import { getAllNews } from "../_db/news-db";

import "./page.css";

/**
 * Landing page of the application.
 */
export default async function Home(): Promise<ReactElement> {

    return (
        <main id="landingPage">
            <section id="firstSection">
                <section id="catalogDescription">
                    <Logo />

                    <section id="searchGameArea">
                        <p className="search-text">Choose among approximately <b>1000</b> games released for the <b>NES</b></p>
                        <TitleSearch titles={await getAllTitles()} />
                    </section>
                </section>
            </section>

            <section id="secondSection">
                <Suspense>
                    <TopicSelection news={await getAllNews()} />
                </Suspense>
            </section>

            <Newsletter />
            <div className="darken-image-bottom" />
        </main>
    );
}
