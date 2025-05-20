'use client';

import { ReactElement, useEffect, useRef, useState } from "react";
import { arima } from "@/app/_fonts/fonts";

import "./page.css";

const TIMELINE = [
    { year: 1983, title: "Famicom gets released", text: "Launching on July 15, 1983, the Family Computer (commonly known by the Japanese-English term Famicom) is an 8-bit console using interchangeable cartridges. The Famicom was released in Japan for ¥14,800 (about $150 at the time, or equivalent to $470.00 in 2024). Its launch game list is Donkey Kong, Donkey Kong Junior, and Popeye. The console was intentionally designed to look like a toy, with a bright red-and-white color scheme and two hardwired gamepads that are stored visibly at the sides of the unit."},
    { year: 1985, title: "Repackaging of the Famicom", text: "At the 1985 CES, Nintendo returned with a stripped-down and cost-reduced redesign of the AVS, having abandoned the home computer approach. Nintendo purposefully designed the system so as not to resemble a video game console, and would avoid terms associated with game consoles, with marketing manager Gail Tilden choosing the term 'Game Pak' for cartridges, 'Control Deck' for the console, and 'Entertainment System' for the whole platform altogether. Renamed the 'Nintendo Entertainment System' (NES), the new and cost-reduced version lacks most of the upscale features added in the AVS, but retains many of its audiophile-inspired design elements, such as the grey color scheme and boxy form factor. To obscure the video game connotation, NES replaced the top-loading cartridge slot of the Famicom and AVS with a front-loading chamber for software cartridges that place the inserted cartridge out of view, reminiscent of a VCR. The Famicom's pair of hard-wired controllers, and the AVS's wireless controllers, were replaced with two custom 7-pin sockets for detachable wired controllers."},
    { year: 1986, title: "Nationwide release in United States", text: "For the nationwide launch in 1986, the NES was available in two different packages: the fully featured US$160 Deluxe Set as had been configured during the New York City launch, and a scaled-down US$99 Control Deck package which included the console, two gamepads, and Super Mario Bros. In early 1986, Nintendo announced the intention to adapt the Famicom Disk System to the NES by late 1986, but the need was obviated by the proliferation of larger and faster cartridge technology, and the drive's NES launch was canceled and the original was discontinued in Japan by the early 1990s." },
    { year: 1987, title: "Released in Europe", text: "The NES was also released in Europe and Australia, in stages and in a rather haphazard manner. It was launched in Scandinavia in September 1986, and in the rest of mainland Europe in different months of 1987 (or most likely 1988 in the case of Spain), depending on the country. The United Kingdom, Ireland, Italy, Australia and New Zealand all received the system in 1987, where it was distributed exclusively by Mattel. In Europe, the NES received a less enthusiastic response than it had elsewhere, and Nintendo lagged in market and retail penetration, though the console was more successful later."},
    { year: 1990, title: "Market decline", text: "In the late 80s, Nintendo's dominance was addressed by newer, technologically superior consoles. In 1987, NEC and Hudson Soft released the PC Engine, and in 1988, Sega released the 16-bit Mega Drive. Both were introduced in North America in 1989, where they were respectively marketed as the TurboGrafx-16 and the Genesis. Facing new competition from the PC Engine in Japan, and the Genesis in North America, Nintendo's market share began to erode. Nintendo responded in the form of the Super Famicom (Super NES or SNES in North America and Europe), the Famicom's 16-bit successor, in 1990."},
    { year: 1995, title: "Discontinuation", text: "After a decade of being on sale overseas, the NES was discontinued on August 14, 1995, with the last game being The Lion King. By the end of its production, more than 60 million NES units had been sold throughout the world." },
    { year: 1997, title: "Emulation", text: "Computer programmers began to develop emulators capable of reproducing the internal workings of the NES on modern personal computers. When paired with a ROM image (a bit-for-bit copy of a NES cartridge's program code), the games can be played on a computer. Emulators also come with a variety of built-in functions that change the gaming experience, such as save states which allow the player to save and resume progress at an exact spot in the game." },
    { year: 2025, title: "The 8-bit Catalog goes online", text: "The purpose of the 8-bit Catalog is to be an as accomplished source of NES games as possible. This catalog is continuously updated with new information. Games supported by the emulator found at URL emulator.joel-rollny.eu can be played in a browser. An increasing number of games will be supported over time due to the emulator being an ongoing project."}
]

export default function AboutPage(): ReactElement {
    const [ year, setYear ] = useState<number>(1983);
    const modalRef = useRef<HTMLDialogElement>(null);
    let position = 0;

    useEffect(() => {
        window.addEventListener("scroll", scroll, false);
        window.addEventListener("resize", closeModal, false);

        return () => {
            window.removeEventListener("scroll", scroll, false);
            window.removeEventListener("resize", closeModal, false);
        };
    }, []);

    /**
     * Updates the active Year when the user scrolls along the Y-axis.
     */
    function scroll(): void {
        if (modalRef.current?.open) {
            modalRef.current?.close();      // Close modal if the modal is open when the user scrolls
        }

        if (position < 150) {
            setYear(1983);
        } else if (150 < position && position < 400) {
            setYear(1985);
        } else if (400 < position && position < 680) {
            setYear(1986);
        } else if (680 < position && position < 920) {
            setYear(1987);
        } else if (920 < position && position < 1200) {
            setYear(1990);
        } else if (1200 < position && position < 1450) {
            setYear(1995);
        } else if (1440 < position && position < 1700) {
            setYear(1997);
        } else if (position > 1700) {
            setYear(2025);
        }
        
        position = window.scrollY;
    }

    /**
     * Close modal if it is still open when the viewport is wider than 520px.
     */
    function closeModal(): void {
        if (window.innerWidth >= 520) {
            modalRef.current?.close();
        }
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
                        { 
                            TIMELINE.map(event => 
                                <article className="timeline-year" onClick={() => setYear(event.year)} key={event.year}>
                                    <h2 className={year === event.year ? "timeline-year__title active" : "timeline-year__title"}> { event.year } </h2>
                                    <div className="hexagon" />
                                </article>
                            )
                        }
                    </section>

                    <dialog id="textModal" ref={modalRef}>
                        <form method="dialog">
                            <h1 className="modal__text"> {TIMELINE.filter(event => event.year === year).map(event => event.text)[0]} </h1>
                            <button onClick={() => modalRef.current?.close()} className={`gameButton ${arima.className}`}> Close </button>
                        </form>
                    </dialog>

                    <section id="timeline-text">
                        { 
                            TIMELINE.map(event => 
                                <article className={`timeline-text ${year === event.year ? "display-element" : "hidden-element"}`} key={event.title}>
                                    <h2 className="timeline-text__title"> {event.title} </h2>
                                    <p className="aboutPage__paragraph"> {event.text} </p>
                                    <button className="gameButton" onClick={() => modalRef.current?.showModal()}> Show text </button>
                                </article>
                            )
                        }
                    </section>
                </section>
            </section>
        </main>
    );
}