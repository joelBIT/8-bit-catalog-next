'use client';

import { ReactElement, useState } from "react";

import "./page.css";

const TIMELINE_TITLE = [
    { year: 1983, title: "Nintendo Released"},
    { year: 1985, title: "Something else"},
    { year: 2025, title: "Catalog online"}
]

const TIMELINE_TEXT = [
    { year: 1983, text: "Launching on July 15, 1983, the Family Computer (commonly known by the Japanese-English term Famicom) is an 8-bit console using interchangeable cartridges. The Famicom was released in Japan for ¥14,800 (about $150 at the time, or equivalent to $470.00 in 2024). Its launch game list is Donkey Kong, Donkey Kong Junior, and Popeye. The console was intentionally designed to look like a toy, with a bright red-and-white color scheme and two hardwired gamepads that are stored visibly at the sides of the unit."},
    { year: 1985, text: "bla bla"},
    { year: 2025, text: "The purpose of the 8-bit Catalog is to be an as accomplished source of NES games as possible. This catalog is continuously updated with new information. Games supported by the emulator found at URL emulator.joel-rollny.eu can be played in a browser. An increasing number of games will be supported over time due to the emulator being an ongoing project."}
]

export default function AboutPage(): ReactElement {
    const [ year, setYear ] = useState<number>(1983);
    const [ title, setTitle ] = useState<string>(TIMELINE_TITLE[0].title);
    const [ text, setText ] = useState<string>(TIMELINE_TEXT[0].text);

    function updateYear(year: number) {
        setYear(year);
        const title = TIMELINE_TITLE.filter(el => el.year === year).map(el => el.title)[0];
        setTitle(title);
        const text = TIMELINE_TEXT.filter(el => el.year === year).map(el => el.text)[0];
        setText(text);
    }

    return (
        <main id="aboutPage">
            <section id="timeline-outer">
                <section id="timeline-inner">

                    <section id="timeline-container">
                        <section id="image-wrapper">
                            <section 
                                id="backgroundImage" 
                                className={`b${year}`}
                            >

                            </section>
                        </section>
                    </section>

                    <section id="timeline-years">
                        <article className="timeline-year" onClick={() => updateYear(1983)}>
                            <h2 className={year === 1983 ? "timeline-year__title active" : "timeline-year__title"}> 1983 </h2>
                            <div className="hexagon" />
                        </article>
                        <article className="timeline-year" onClick={() => updateYear(1985)}>
                            <h2 className={year === 1985 ? "timeline-year__title active" : "timeline-year__title"}> 1985 </h2>
                            <div className="hexagon" />
                        </article>
                        <article className="timeline-year" onClick={() => updateYear(2025)}>
                            <h2 className={year === 2025 ? "timeline-year__title active" : "timeline-year__title"}> 2025 </h2>
                            <div className="hexagon" />
                        </article>
                    </section>

                    <section id="timeline-text">
                        <article className="timeline-text">
                            <h2 className="timeline-text__title"> {title} </h2>
                            <p className="aboutPage__paragraph"> {text} </p>
                        </article>
                    </section>
                </section>
            </section>
        </main>
    );
}