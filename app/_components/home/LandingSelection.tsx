'use client';

import { ReactElement, useState } from "react";
import { NewsCard } from ".";
import { News } from "@/app/_types/types";

import "./LandingSelection.css";

export function LandingSelection({news}: {news: News[]}): ReactElement {
    const options = ["news", "favourites"];
    const [active, setActive] = useState<string>(options[0]);
    
    return (
        <section id="landingSelection">
            <section id="landing-selection-top">
                <ul id="landing-selection-list">
                    <li 
                        className={active === options[0] ? "landing-selection-list__item active" : "landing-selection-list__item"} 
                        onClick={() => setActive(options[0])}
                    > 
                        {active === options[0] ? <h3 className="item-arrow"> &#10148; </h3> : <></>}
                        <h3 className="item-title"> News </h3>
                    </li>

                    <li 
                        className={active === options[1] ? "landing-selection-list__item active" : "landing-selection-list__item"} 
                        onClick={() => setActive(options[1])}
                    > 
                        {active === options[1] ? <h3 className="item-arrow"> &#10148; </h3> : <></>}
                        <h3 className="item-title"> Choose Favourites </h3>
                    </li>
                </ul>
                
                {
                    active === "favourites" ? 
                            <p id="landing-selection-text"> 
                                You can label games of your choosing as favourites. Such games are easily accessed by clicking on the Favourites link.
                                Favourites are persisted permanently if you have signed in to your account when labeling them.
                            </p>
                            :
                            <p id="landing-selection-text"> 
                                I publish news when something interesting occurs in this hobby project.
                                An email is sent to those who have an active newsletter subscription when news is published.
                            </p>
                }
            </section>

            {
                active === "favourites" ?
                    <section id="favouriteCarousel">
                        {
                            news.map(news => <NewsCard key={news.text} news={news} />)
                        }
                    </section>
                    :
                    <section id="newsCards">
                        {
                            news.map(news => <NewsCard key={news.text} news={news} />)
                        }
                    </section>
            }
        </section>
    )
}