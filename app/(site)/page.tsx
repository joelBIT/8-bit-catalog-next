'use server';

import { type ReactElement } from "react";
import Link from "next/link";
import { TopicSelection, TitleSearch } from "@/app/_components/home";
import { Newsletter } from "../_components/common";
import { getAllNews, getAllTitles } from "@/app/_db/db";
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
                    <section className="visionCard">
                        <h2 className="visionCard-heading">
                            Vision
                        </h2>

                        <p className="visionCard-text">
                            A place for all things related to the Nintendo Entertainment System, where it is possible to connect with other 8-bit enthusiasts.
                        </p>
                    </section>
                    
                    <section className="landing-title">
                        <h2 className="landing-heading"> 
                            The 8-bit catalog 
                        </h2>

                        <div className="logo-backdrop-text"> Solution </div>
                    </section>

                    <p className="landing-title-text">
                        This catalog is continuously updated with new information and functionality. 
                        Become a member to connect with other 8-bit enthusiasts.
                        Test the catalog by entering a game title and clicking on the View button.
                    </p>
                </section>

                <section id="searchGameArea">
                    <TitleSearch titles={await getAllTitles()} />
                </section>
            </section>

            <section id="joinCatalog">
                <h2 className="joinCatalog-title"> Join the 8-bit family </h2>
                <p className="joinCatalog-text"> 
                    Become part of the catalog and unlock services including real-time interaction with other members, exclusive offers, info about retro events, and more.
                </p>
                
                <Link href={URL_REGISTER_PAGE} id="signup-button"> Sign up now </Link>
            </section>

            <section id="secondSection">
                <TopicSelection news={await getAllNews()} />
            </section>

            <Newsletter />
            <div className="darken-image-bottom" />
        </main>
    );
}
