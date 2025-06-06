import { ReactElement } from "react";

import "./Text.css";

export function Text(): ReactElement {
    return (
        <section id="text">
            <h2 className="text__title"> 8-bit catalog </h2>
            <p> The best things in life come in 8-bits </p>
        </section>
    );
}