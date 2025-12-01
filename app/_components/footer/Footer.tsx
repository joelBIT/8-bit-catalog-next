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
                <h4 className="copyright__text"> Copyright </h4>
                <span className="material-symbols-outlined"> copyright </span> 
                <h4 className="copyright__text"> 2025 &#x2022; Joel Rollny </h4>
            </article>
        </footer>
    );
}