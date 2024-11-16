"use client";

import { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "./SiteLinks.css";

export function SiteLinks(): ReactElement {
    const pathname = usePathname();

    const SITELINKS = [
        {path: "/", title: "Home"},
        {path: "/about", title: "About"},
        {path: "/login", title: "Account"}
    ];

    return (
        <section id="siteLinks">
            <h2 className="siteLinks__title">Site Links</h2>
            <ul className="siteLinks__list">
                {
                    SITELINKS.map(link => 
                        <li>
                            <Link href={link.path} className={pathname === link.path ? `active siteLinks__link` : `siteLinks__link`}>
                                <h4 className="siteLinks__link-title"> {link.title} </h4>
                            </Link>
                        </li>
                    )
                }
            </ul>
        </section>
    );
}