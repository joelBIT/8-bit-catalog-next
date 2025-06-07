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
        <section className="faq" onClick={() => setIsShowing(!isShowing)}>
             <section className="faq-card">
                <h2 className="faq-card__question"> { faq.question } </h2> 

                <img src="/arrow_right.png" className={isShowing ? "rotate-down" : "rotate-up"} />
            </section>

            <div className={isShowing ? "accordion-panel dropdown" : "accordion-panel"}>
                <p className="accordion__text"> { faq.answer } </p>
            </div>
        </section>
    );
}