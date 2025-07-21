import { ReactElement } from "react";
import Link from "next/link";
import { Logo } from "../_components/header";
import { TitleSearch } from "@/app/_components/home/TitleSearch";
import { NewsCard } from "@/app/_components/home/NewsCard";
import { getAllTitles, getAllNews } from "@/app/_db/db";
import { isAuthenticated } from "@/app/_session/utils";
import { arima } from "@/app/_fonts/fonts";

import "./page.css";

/**
 * Landing page of the application.
 */
export default async function Home(): Promise<ReactElement> {

    return (
        <main id="landingPage">
            <section id="firstSection">
                <section id="image-wrapper">
                    <Logo />
                </section>

                <section id="catalogDescription">
                    <hr />

                    <h1 className="description-heading bit-font">
                        8-BIT ENTHUSIASTS
                    </h1>
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

                    {
                        await isAuthenticated() ?
                            <></>
                            :
                            <section id="landing-register">
                                <Link href="/register" id="registerButton" className="authButton"> REGISTER </Link>
                            </section>
                    }

                    <hr />
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
                        (await getAllNews()).map(news => <NewsCard key={news.text} text={news.text} date={news.date} />)
                    }
                </section>

                <section id="newsletter">
                    <img src="/metroidscreen.webp" id="newsletterBackground" alt="Metroid newsletter background" />
                    <h2 className="subscription-text"> Subscribe to receive the newsletter.</h2>

                    <form id="newsletterSignup">
                        <input id="subscribeEmail" type="email" placeholder="Enter Email" required={true} />
                        <button id="subscribeButton" type="submit" className={`button__link ${arima.className}`}> Subscribe </button>
                    </form>
                </section>
            </section>
        </main>
    );
}
