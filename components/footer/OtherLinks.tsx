import { ReactElement } from "react";

import "./OtherLinks.css";

export function OtherLinks(): ReactElement {

    const OTHERLINKS = [
        {url: "https://www.nesdev.org/", title: "NesDev"},
        {url: "https://nesninja.com/game/nes/", title: "NES Ninja"},
        {url: "https://nescartdb.com/", title: "NesCartDB"},
        {url: "http://www.romdetectives.com/Wiki/index.php", title: "ROM Detectives"}
    ];

    return (
        <section id="otherLinks">
            <h2 className="otherLinks__title">Other Links</h2>
            <ul className="otherLinks__list">
                {
                    OTHERLINKS.map((link, index) => 
                        <li key={index}>
                            <a href={link.url} target="_blank" className="otherLinks__link">
                                <h4 className="otherLinks__link-title"> {link.title} </h4>
                            </a>
                        </li>
                    )
                }
            </ul>
        </section>
    );
}