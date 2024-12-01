"use client";

import { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

import "./SiteLinks.css";

export function SiteLinks(): ReactElement {
    const pathname = usePathname();
    const { user } = useAuth();

    const SITELINKS = [
        {path: "/", title: "Home"},
        {path: "/about", title: "About"}
    ];

    return (
        <section id="siteLinks">
            <h2 className="siteLinks__title">Site Links</h2>
            <ul className="siteLinks__list">
                {
                    SITELINKS.map((link, index) => 
                        <li key={index}>
                            <Link href={link.path} className={pathname === link.path ? `active siteLinks__link` : `siteLinks__link`}>
                                <h4 className="siteLinks__link-title"> {link.title} </h4>
                            </Link>
                        </li>
                    )
                }
                <li key={SITELINKS.length}>
                    <Link 
                        href={user ? "/account" : "/login"} 
                        className={pathname === "/login" || pathname === "/account" ? `active siteLinks__link` : `siteLinks__link`}>
                        <h4 className="siteLinks__link-title"> Account </h4>
                    </Link>
                </li>
            </ul>
        </section>
    );
}