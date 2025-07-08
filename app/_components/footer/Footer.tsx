'use client';

import { ReactElement } from "react";
import { usePathname } from "next/navigation";
import { SiteLinks, Text } from ".";

import "./Footer.css";

export function Footer(): ReactElement {
    const pathname = usePathname();

    return (
        <footer className={pathname === "/sites" ? "landing" : ""}>
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