import { ReactElement } from "react";
import Link from "next/link";

import "./SiteLinks.css";

export function SiteLinks(): ReactElement {
    return (
        <section id="siteLinks">
            <Link href="/contact"> Contact </Link>
            <Link href="/faq"> FAQ </Link>
            <Link href="/sites"> Other sites </Link>
        </section>
    );
}