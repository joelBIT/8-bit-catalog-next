import { ReactElement } from "react";
import { SiteLinks } from "./SiteLinks";
import { Contact } from "./Contact";
import { OtherLinks } from "./OtherLinks";

export function Footer(): ReactElement {
    return (
        <footer>
            <section id="footerComponents">
                <SiteLinks />
                <Contact />
                <OtherLinks />
            </section>
            <h4 id="copyright"><span className="material-symbols-outlined">copyright</span> 2024 Joel Rollny</h4>
        </footer>
    );
}