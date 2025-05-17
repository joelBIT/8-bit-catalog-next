'use client';

import { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { URL_ABOUT_PAGE, URL_DASHBOARD_PAGE, URL_HOME, URL_LOGIN_PAGE } from "@/app/_utils/utils";

import "./SiteLinks.css";

export function SiteLinks( { authenticated } : { authenticated: boolean} ): ReactElement {
    const pathname = usePathname();

    const SITELINKS = [
        {path: URL_HOME, title: "Home"},
        {path: URL_ABOUT_PAGE, title: "About"}
    ];

    return (
        <section id="siteLinks">
            <h2 className="siteLinks__title"> Site Links </h2>
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
                        href={authenticated ? URL_DASHBOARD_PAGE : URL_LOGIN_PAGE} 
                        className={pathname === URL_LOGIN_PAGE || pathname === URL_DASHBOARD_PAGE ? `active siteLinks__link` : `siteLinks__link`}>
                        <h4 className="siteLinks__link-title"> Account </h4>
                    </Link>
                </li>
            </ul>
        </section>
    );
}