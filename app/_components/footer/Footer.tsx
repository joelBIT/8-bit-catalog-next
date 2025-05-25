import { ReactElement } from "react";
import { Contact, OtherLinks } from ".";

import "./Footer.css";

export function Footer(): ReactElement {

    return (
        <footer>
            <section id="footerComponents">
                <Contact />
                <OtherLinks />
            </section>
            
            <article id="copyright">
                <h4 className="copyright__text"> Copyright </h4>
                <span className="material-symbols-outlined"> copyright </span> 
                <h4 className="copyright__text">2025</h4>
            </article>
        </footer>
    );
}