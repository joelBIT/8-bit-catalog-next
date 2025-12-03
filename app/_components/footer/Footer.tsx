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
                <span className="material-symbols-outlined"> copyright </span> 
                <h4 className="copyright__text"> 2025 Joel Rollny </h4>
            </article>
        </footer>
    );
}