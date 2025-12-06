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
                        {active === options[0] ? <h3 className="item-arrow"> &#10148; </h3> : <></>} News
                    </li>

                    <li 
                        className={active === options[1] ? "landing-selection-list__item active" : "landing-selection-list__item"} 
                        onClick={() => setActive(options[1])}
                    > 
                        {active === options[1] ? <h3 className="item-arrow"> &#10148; </h3> : <></>} Choose Favourites 
                    </li>
                </ul>
                
                {
                    active === "favourites" ? 
                            <p id="landing-selection-text"> 
                                Select your favourite games.
                            </p>
                            :
                            <p id="landing-selection-text"> 
                                I publish news every now and then when I have done something interesting on this hobby project.
                            </p>
                }
            </section>

            {
                active === "favourites" ?
                    <></>
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