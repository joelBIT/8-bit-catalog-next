import { Suspense, type ReactElement } from "react";
import { Logo, Newsletter, SuggestionList, NewsCard } from "@/app/_components/home";
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
                    <article className="presentation">
                        <h1 className="welcome-text">
                            Welcome to
                            <hr className="line" />
                        </h1>
                        
                        <section className="logo-section">
                            <Logo />
                            <h1 className="logo-text">Every cartridge tells a story</h1>
                        </section>
                        
                        <section id="searchGameArea">
                            <p className="search-text">
                                A catalog, an archive, and a clubhouse. All built for one console that never really left.
                                Choose among approximately <b>1000</b> games released for the <b>Nintendo Entertainment System</b>.
                            </p>
                            <Suspense fallback={<p className="search-text"> Loading games... </p>}>
                                <GameSuggestions />
                            </Suspense>
                        </section>
                    </article>
                </section>
            </section>

            <section id="secondSection">
                <h2 className="recent-news__heading">
                    Most recent news
                </h2>

                <section id="newsCards">
                    <Suspense fallback={null}>
                        <RecentNews />
                    </Suspense>
                </section>
            </section>

            <Newsletter />
            <div className="darken-image-bottom" />
        </main>
    );
}

async function GameSuggestions(): Promise<ReactElement> {
    return <SuggestionList options={await getAllTitles()} />;
}

/**
 * 
 * @returns all news at the moment, change in the future to a limit of 9 news items.
 */
async function RecentNews(): Promise<ReactElement> {
    const latest = await getAllNews();
    return <>{latest.map(item => <NewsCard key={item.id} news={item} />)}</>;
}
