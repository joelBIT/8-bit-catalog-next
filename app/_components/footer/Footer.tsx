import { ReactElement } from "react";
import { Contact, OtherLinks, SiteLinks } from ".";
import { isAuthenticated } from "@/app/_session/utils";

import "./Footer.css";

export async function Footer(): Promise<ReactElement> {

    return (
        <footer>
            <section id="footerComponents">
                <SiteLinks authenticated={await isAuthenticated()} />
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