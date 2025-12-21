import { ReactElement } from "react";

import "./VisionCard.css";

export function VisionCard({heading, text}: {heading: string, text: string}): ReactElement {
    return (
        <section className="visionCard">
            <h2 className="visionCard-heading">
                {heading}
            </h2>

            <p className="visionCard-text">
                {text}
            </p>
        </section>
    )
}