'use client';

import { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { URL_ARCHITECTURE_PAGE, URL_CONTACT_PAGE, URL_FAQ_PAGE, URL_RESOURCES_PAGE } from "@/app/_utils/utils";

import "./SiteLinks.css";

export function SiteLinks(): ReactElement {
    const pathname = usePathname();
    
    return (
        <section id="siteLinks">
            <h4 className="siteLinks-heading"> Site </h4>
            
            <section id="links">
                <Link href={URL_ARCHITECTURE_PAGE} className={pathname === URL_ARCHITECTURE_PAGE ? "active" : ""}> Architecture </Link>
                <Link href={URL_CONTACT_PAGE} className={pathname === URL_CONTACT_PAGE ? "active" : ""}> Contact </Link>
                <Link href={URL_FAQ_PAGE} className={pathname === URL_FAQ_PAGE ? "active" : ""}> FAQ </Link>
                <Link href={URL_RESOURCES_PAGE} className={pathname === URL_RESOURCES_PAGE ? "active" : ""}> Resources </Link>
            </section>
        </section>
    );
}