'use client';

import { ReactElement, useState } from "react";
import { NewsCard } from ".";
import { News } from "@/app/_types/types";

import "./LandingSelection.css";

export function LandingSelection({news}: {news: News[]}): ReactElement {
    const [active, setActive] = useState<number>(0);

    const text = [
        "I publish news when something interesting occurs in this hobby project. An email is sent to those who have an active newsletter subscription when news is published.",
        "You can label games of your choosing as favourites. Such games are easily accessed by clicking on the Favourites link. Favourites are persisted permanently if you have signed in to your account when labeling them."
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
                </ul>
                
                <p id="landing-selection-text"> 
                    { text[active] }
                </p>
            </section>

            <section id="newsCards">
                {
                    news.map(news => <NewsCard key={news.text} news={news} />)
                }
            </section>
        </section>
    )
}