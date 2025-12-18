'use client';

import { ReactElement, useEffect, useRef, useState } from "react";
import { TimelineEvent } from "@/app/_types/types";
import { getTimelineEvents } from "@/app/_client/client";

import "./page.css";

/**
 * Show some significant events in the history of the NES. Click on a specific year in the timeline to scroll to that year.
 */
export default function TimelinePage(): ReactElement {
    const [year, setYear] = useState<number>(1983);
    const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
    const modalRef = useRef<HTMLDialogElement>(null);
    let position = 0;
    const yearPositions = {"1983": 0, "1985": 252, "1986": 452, "1987": 682, "1990": 982, "1995": 1302, "1997": 1542, "2025": 1782} as {[key: string]: number};

    useEffect(() => {
        window.addEventListener("scroll", scroll, false);
        window.addEventListener("resize", closeModal, false);

        getTimeline();

        return () => {
            window.removeEventListener("scroll", scroll, false);
            window.removeEventListener("resize", closeModal, false);
        };
    }, []);

    /**
     * Retrieve the timeline for the NES.
     */
    async function getTimeline(): Promise<void> {
        setTimeline(await getTimelineEvents());
    }

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

    function updateYear(year: number): void {
        setYear(year);
        position = yearPositions[year];
        window.scrollTo({
            top: yearPositions[year],
            behavior: 'smooth'
        });
    }

    return (
        <main id="timelinePage">
            <section id="timeline-inner">
                <section id="timeline-container">
                    {
                        timeline?.map(event => 
                            <img 
                                src={"/timeline/" + event.image}
                                className={`backgroundImage ${year === event.year ? `b${year} display-element` : "hidden-element"}`} 
                                key={event.image}
                                alt="Timeline image"
                            />
                        )
                    }
                </section>

                <section id="timeline-years">
                    { 
                        timeline?.map(event => 
                            <article className="timeline-year" onClick={() => updateYear(event.year)} key={event.year}>
                                <h2 className={year === event.year ? "timeline-year__title active" : "timeline-year__title"}> { event.year } </h2>
                                <div className="hexagon" />
                            </article>
                        )
                    }
                </section>

                <dialog id="textModal" ref={modalRef} className="modal-dialog">
                    <form method="dialog" className="modal-content">
                        <h1 className="modal__title"> {timeline?.filter(event => event.year === year).map(event => event.title)[0]} </h1>
                        <h1 className="modal__text"> {timeline?.filter(event => event.year === year).map(event => event.text)[0]} </h1>
                        <span onClick={() => modalRef.current?.close()} className="closeButton" />
                    </form>
                </dialog>

                <section id="timeline-text">
                    { 
                        timeline?.map(event => 
                            <article className={`timeline-text ${year === event.year ? "display-element" : "hidden-element"}`} key={event.title}>
                                <h2 className="timeline-text__title"> {event.title} </h2>
                                <p className="timelinePage__paragraph"> {event.text} </p>
                                <button className="button__link" onClick={() => modalRef.current?.showModal()}> Show text </button>
                            </article>
                        )
                    }
                </section>
            </section>
        </main>
    );
}