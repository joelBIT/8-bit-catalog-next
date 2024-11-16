"use client";

import { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "./SiteLinks.css";

export function SiteLinks(): ReactElement {
    const pathname = usePathname();

    return (
        <section id="siteLinks">
            <h2 className="siteLinks__title">Site Links</h2>
            <ul className="siteLinks__list">
                <li>
                    <Link href="/" className={pathname === "/" ? `active siteLinks__link` : `siteLinks__link`}>
                        <h4 className="siteLinks__link-title">Home</h4>
                    </Link>
                </li>
                <li>
                    <Link href="/about" className={pathname === "/about" ? `active siteLinks__link` : `siteLinks__link`} >
                        <h4 className="siteLinks__link-title">About</h4>
                    </Link>
                </li>
                <li>
                    <Link href="/login" className={pathname === "/login" ? `active siteLinks__link` : `siteLinks__link`}>
                        <h4 className="siteLinks__link-title">Account</h4>
                    </Link>
                </li>
            </ul>
        </section>
    );
}