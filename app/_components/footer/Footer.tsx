import { ReactElement } from "react";
import { SiteLinks, Text } from ".";

import "./Footer.css";

export function Footer(): ReactElement {
    return (
        <footer>
            <section id="footerComponents">
                <Text />
                <SiteLinks />
            </section>
            
            <article id="copyright">
                <span className="material-symbols-outlined"> copyright </span> 
                <h4 className="copyright__text"> 2025 &#x2022; Design by Joel Rollny </h4>
            </article>
        </footer>
    );
}