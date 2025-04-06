import { ReactElement } from "react";
import Link from "next/link";

import "./AccountMenu.css";

/**
 * Used to navigate between account-specific sections.
 */
export function AccountMenu(): ReactElement {
    return (
        <section id="accountMenu">
            <article id="menus">
                <h1>Menus</h1>
                <Link href="/dashboard"> Dashboard </Link>
                <Link href="/dashboard/profile"> Profile </Link>
            </article>

            <article id="settings">
                <h1>Account settings</h1>
                <Link href="/dashboard/settings"> Settings </Link>
            </article>
        </section>
    );
}