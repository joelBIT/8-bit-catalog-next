'use client';

import { ReactElement, useState } from "react";
import { type FAQ } from "@/app/_types/types";

import "./FAQ.css";

/**
 * A frequently asked question.
 */
export function FAQ({ faq }: { faq: FAQ }): ReactElement {
    const [isShowing, setIsShowing] = useState(false);
    
    return (
        <section className="faq">
             <section className="faq-card">
                <section className="faq-card-text">
                    <span className="material-symbols-outlined"> help </span>
                    <h2 className="faq-card__question" onClick={() => setIsShowing(!isShowing)}> { faq.question } </h2> 
                </section>

                <div className={isShowing ? "faq-open" : "faq-closed"} onClick={() => setIsShowing(!isShowing)} />
            </section>

            <div className={isShowing ? "accordion-panel dropdown" : "accordion-panel"}>
                <p className="accordion__text"> { faq.answer } </p>
            </div>
        </section>
    );
}