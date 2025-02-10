import { ReactElement } from "react";
import { SiteLinks } from "./SiteLinks";
import { Contact } from "./Contact";
import { OtherLinks } from "./OtherLinks";
import { isAuthenticated } from "@/app/utils/utils";

import "./Footer.css";

export async function Footer(): Promise<ReactElement<ReactElement>> {

    return (
        <footer>
            <section id="footerComponents">
                <SiteLinks authenticated={await isAuthenticated()} />
                <Contact />
                <OtherLinks />
            </section>
            <h4 id="copyright"><span className="material-symbols-outlined">copyright</span> 2025 Joel Rollny</h4>
        </footer>
    );
}