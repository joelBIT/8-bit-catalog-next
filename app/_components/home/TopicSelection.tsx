'use client';

import { ReactElement, useState } from "react";
import { NewsCard } from ".";
import { News } from "@/app/_types/types";

import "./TopicSelection.css";

/**
 * Choose which topic to show information about.
 */
export function TopicSelection({news}: {news: News[]}): ReactElement {
    const [active, setActive] = useState<number>(0);

    const text = [
        "News is published every now and then. An email is sent to those who have an active newsletter subscription at the time of publication. A subscription can always be discontinued when desired.",
        "Select your favourite games. You can label a game as a favourite by clicking on its heart-shaped icon. The game is stored permanently in a database if you have signed in to your account. Otherwise local storage is used. Those are easily accessed by visiting the Favourites page.",
        "Connect with other retro enthusiasts. When logged in, you can scan through existing profiles and interact with people. Create an account and make your own profile today!"
    ]
    
    return (
        <section id="topicSelection">
            <section id="topic-selection-top">
                <ul id="topic-selection-list">
                    <li 
                        className={active === 0 ? "topic-selection-list__item active" : "topic-selection-list__item"} 
                        onClick={() => setActive(0)}
                    > 
                        {active === 0 ? <h3 className="item-arrow"> &#10148; </h3> : <></>}
                        <h3 className="item-title"> News </h3>
                    </li>

                    <li 
                        className={active === 1 ? "topic-selection-list__item active" : "topic-selection-list__item"} 
                        onClick={() => setActive(1)}
                    > 
                        {active === 1 ? <h3 className="item-arrow"> &#10148; </h3> : <></>}
                        <h3 className="item-title"> Choose Favourites </h3>
                    </li>

                    <li 
                        className={active === 2 ? "topic-selection-list__item active" : "topic-selection-list__item"} 
                        onClick={() => setActive(2)}
                    > 
                        {active === 2 ? <h3 className="item-arrow"> &#10148; </h3> : <></>}
                        <h3 className="item-title"> Connect </h3>
                    </li>
                </ul>
                
                <p id="topic-selection-text"> 
                    { text[active] }
                </p>
            </section>

            <h2 className="recent-news__heading">
                Most recent news
            </h2>

            <section id="newsCards">
                {
                    news.map(news => <NewsCard key={news.text} news={news} />)
                }
            </section>
        </section>
    )
}