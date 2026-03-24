'use server';

import { type ReactElement } from "react";
import Link from "next/link";
import { TopicSelection, TitleSearch } from "@/app/_components/home";
import { Newsletter } from "../_components/common";
import { getAllTitles } from "../_db/games-db";
import { getAllNews } from "../_db/news-db";
import { URL_REGISTER_PAGE } from "../_utils/utils";

import "./page.css";

/**
 * Landing page of the application.
 */
export default async function Home(): Promise<ReactElement> {

    return (
        <main id="landingPage">
            <section id="firstSection">
                <section id="catalogDescription">
                    <h1 className="landing-title">
                            The 8-bit catalog 
                    </h1>

                    <section className="landing-cards">
                        <section className="landing-card">
                            <h3 className="landing-title__heading">Vision</h3>
                            <p className="landing-card__text">
                                A place for all things related to the Nintendo Entertainment System, where it is possible to 
                                connect with other 8-bit enthusiasts.
                            </p>
                        </section>

                        <section className="landing-card">
                            <h3 className="landing-title__heading">Solution</h3>
                            <p className="landing-card__text">
                                The 8-bit Catalog.
                                This catalog is continuously updated with new information and functionality. 
                                Test the catalog by entering a game title and clicking on the View button.
                            </p>
                        </section>

                        <section className="landing-card">
                            <h3 className="landing-title__heading">Join</h3>
                            <p className="landing-card__text">
                                Become a member to connect with other 8-bit enthusiasts.
                                Membership unlock services including real-time interaction with 
                                other members, exclusive offers, info about retro events, and more.
                            </p>

                            <Link href={URL_REGISTER_PAGE} className="signup-button"> Sign up now </Link>
                        </section>
                    </section>
                </section>

                <section id="searchGameArea">
                    <TitleSearch titles={await getAllTitles()} />
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
