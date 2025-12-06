'use client';

import { ReactElement } from "react";
import { SiteLinks, SubscriptionBox, Text } from ".";

import "./Footer.css";

export function Footer(): ReactElement {

    return (
        <footer>
            <section id="footerComponents">
                <Text />
                <SiteLinks />
                <SubscriptionBox />
            </section>
            
            <article id="copyright">
                <h4 className="copyright__text"> &#169; 2025 Joel Rollny </h4>
            </article>
        </footer>
    );
}