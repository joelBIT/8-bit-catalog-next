'use client';

import { ReactElement, useState } from "react";
import { NewsCard } from ".";
import { News } from "@/app/_types/types";

import "./LandingSelection.css";

export function LandingSelection({news}: {news: News[]}): ReactElement {
    const [active, setActive] = useState<number>(0);

    const text = [
        "News is published every now and then. An email is sent to those who have an active newsletter subscription when news is published. A subscription can always be discontinued when desired.",
        "Choose your favourite game. You can label games as favourites by clicking on their heart-shaped icon. Such games are easily accessed by visiting the Favourites page. Favourites are persisted permanently if you have signed in to your account when labeling them.",
        "Connect with other retro enthusiasts. When logged in you can scan through existing profiles and interact with people. Create an account now and make your own profile."
    ]
    
    return (
        <section id="landingSelection">
            <section id="landing-selection-top">
                <ul id="landing-selection-list">
                    <li 
                        className={active === 0 ? "landing-selection-list__item active" : "landing-selection-list__item"} 
                        onClick={() => setActive(0)}
                    > 
                        {active === 0 ? <h3 className="item-arrow"> &#10148; </h3> : <></>}
                        <h3 className="item-title"> News </h3>
                    </li>

                    <li 
                        className={active === 1 ? "landing-selection-list__item active" : "landing-selection-list__item"} 
                        onClick={() => setActive(1)}
                    > 
                        {active === 1 ? <h3 className="item-arrow"> &#10148; </h3> : <></>}
                        <h3 className="item-title"> Choose Favourites </h3>
                    </li>

                    <li 
                        className={active === 2 ? "landing-selection-list__item active" : "landing-selection-list__item"} 
                        onClick={() => setActive(2)}
                    > 
                        {active === 2 ? <h3 className="item-arrow"> &#10148; </h3> : <></>}
                        <h3 className="item-title"> Connect </h3>
                    </li>
                </ul>
                
                <p id="landing-selection-text"> 
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