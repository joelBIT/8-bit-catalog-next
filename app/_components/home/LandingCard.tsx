import { ReactElement } from "react";

import "./LandingCard.css";

export function LandingCard({heading, text}: {heading: string, text: string}): ReactElement {
    return (
        <section className="landingCard">
            <h2 className="landingCard-heading">
                {heading}
            </h2>

            <h3 className="landingCard-text">
                {text}
            </h3>
        </section>
    )
}