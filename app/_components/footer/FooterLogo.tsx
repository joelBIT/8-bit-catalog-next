import { ReactElement } from "react";

import "./FooterLogo.css";

export function FooterLogo(): ReactElement {
    return (
        <section id="footerLogo">
            <h2 className="footerLogo__title"> 8-bit catalog </h2>
            <p className="footerLogo__text"> The best things in life come in 8-bits </p>
        </section>
    );
}