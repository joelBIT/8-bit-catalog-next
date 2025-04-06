'use client';

import { ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/auth/session";

import "./AccountMenu.css";

/**
 * Used to navigate between account-specific sections.
 */
export function AccountMenu(): ReactElement {
    const router = useRouter();

    async function logout(event: React.MouseEvent<HTMLAnchorElement>): Promise<void> {
        event.preventDefault();
        signOut();
        router.refresh();
    }

    return (
        <section id="accountMenu">
            <article id="menus">
                <h1 className="menus-title">Menus</h1>

                <Link href="/dashboard" className="account-menu__link">
                    <span className="material-symbols-outlined"> dashboard </span> Dashboard 
                </Link>

                <Link href="/dashboard/profile" className="account-menu__link"> 
                    <span className="material-symbols-outlined"> person </span> Profile 
                </Link>
            </article>

            <article id="settings">
                <h1 className="settings-title">Account settings</h1>

                <Link href="/dashboard/settings" className="account-menu__link"> 
                    <span className="material-symbols-outlined"> settings </span> Settings 
                </Link>

                <Link href="#" className="account-menu__link" onClick={logout}> 
                    <span className="material-symbols-outlined"> power_settings_new </span> Logout 
                </Link>
            </article>
        </section>
    );
}