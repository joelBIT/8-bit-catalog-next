'use client';

import { ReactElement } from "react";
import { SiteLinks, SubscriptionBox, FooterLogo } from ".";

import "./Footer.css";

export function Footer(): ReactElement {

    return (
        <footer>
            <section id="footerComponents">
                <FooterLogo />
                <SiteLinks />
                <SubscriptionBox />
            </section>
            
            <article id="copyright">
                <h4 className="copyright__text"> &#169; 2025 Joel Rollny </h4>
            </article>
        </footer>
    );
}