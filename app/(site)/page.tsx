import { type ReactElement } from "react";
import { Logo } from "../_components/header";
import { TitleSearch, NewsCard, SubscriptionBox } from "@/app/_components/home";
import { getAllTitles, getAllNews } from "@/app/_db/db";

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
                    <section id="catalogVision">
                        <article className="description-heading">
                            <hr/>
                            <h2 className="catalog-description">
                                Vision
                            </h2>
                        </article>

                        <h3 className="description-text">
                            A place for all things related to the Nintendo Entertainment System, where it is possible to connect with other 8-bit enthusiasts.
                        </h3>
                    </section>

                    <section id="catalogSolution">
                        <article className="description-heading">
                            <hr/>
                            <h2 className="catalog-description">
                                Solution
                            </h2>
                        </article>

                        <h3 className="description-text">
                            The 8-bit Catalog.
                            This catalog is continuously updated with new information and functionality.
                            Become a member to connect with other 8-bit enthusiasts.
                        </h3>
                    </section>
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
