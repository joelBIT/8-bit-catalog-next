import { JSX } from "react";
import Link from "next/link";
import { Logo } from "../_components/header";
import { TitleSearch, NewsCard, SubscriptionBox } from "@/app/_components/home";
import { getAllTitles, getAllNews } from "@/app/_db/db";
import { isAuthenticated } from "@/app/_session/utils";

import "./page.css";

/**
 * Landing page of the application.
 */
export default async function Home(): Promise<JSX.Element> {

    return (
        <main id="landingPage">
            <section id="firstSection">
                <section id="image-wrapper">
                    <Logo />
                </section>

                {
                    await isAuthenticated() ?
                        <></>
                        :
                        <section id="registerButtonSection">
                            <h1 className="description-heading bit-font">
                                8-BIT ENTHUSIASTS
                            </h1>

                            <section id="landing-register">
                                <Link href="/register" id="registerButton" className="authButton"> REGISTER </Link>
                            </section>
                        </section>
                }

                <section id="catalogDescription">
                    <h2 className="catalog-description">
                        The 8-bit Catalog provides a way to connect with other 8-bit enthusiasts.
                    </h2>
                    <h3 className="description-text">
                        The purpose of the 8-bit Catalog is to be an as accomplished source of NES games as possible.
                        This catalog is continuously updated with new information. Games supported by the emulator
                        found at <Link href="https://emulator.joel-rollny.eu/" target="_blank"> emulator.joel-rollny.eu </Link>
                        can be played in a browser.
                        Become a member to connect with other 8-bit enthusiasts.
                    </h3>
                </section>
            </section>

            <section id="secondSection">
                <section id="searchGameArea">
                    <h2> Give the catalog a try and see if you can find the game you are looking for! </h2>
                    <TitleSearch titles={await getAllTitles()} />
                </section>
            </section>

            <section id="thirdSection">
                <section id="newsHeading" className="bit-font">
                    <hr />
                    <h2 className="news-heading"> News </h2>
                    <hr />
                </section>

                <section id="newsCards">
                    {
                        (await getAllNews()).map(news => <NewsCard key={news.text} text={news.text} date={news.date} heading={news.heading} />)
                    }
                </section>

                <SubscriptionBox />
            </section>
        </main>
    );
}
