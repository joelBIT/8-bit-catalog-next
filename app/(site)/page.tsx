'use server';

import { type ReactElement } from "react";
import { TopicSelection, LandingCards, Logo } from "@/app/_components/home";
import { Newsletter } from "../_components/common";
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

                    <LandingCards allGameTitles={await getAllTitles()} />
                </section>
            </section>

            <section id="secondSection">
                <TopicSelection news={await getAllNews()} />
            </section>

            <Newsletter />
            <div className="darken-image-bottom" />
        </main>
    );
}
