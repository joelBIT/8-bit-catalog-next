'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { createAuthClient } from '@/utils/supabase/client';
import { rancho } from "@/fonts/fonts";
import close from "../../assets/close_icon.png";
import hamburger from "../../assets/hamburger_icon.png";

import "./AuthenticatedNavBar.css";

export function AuthenticatedNavBar() {
    const [ showMenu, setShowMenu ] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    async function logout() {
        const browserClient = createAuthClient();
        const { error } = await browserClient.auth.signOut();
        if (error) {
            console.log(error);
        }
        router.refresh();
    }
    
    return (
        <nav className="navbar">
            <ul className={showMenu ? "navbar__list showmenu" : "navbar__list"}>
                <li className="navbar__list-element">
                    <Link 
                        href="/search" 
                        className={pathname === "/search" ? `active navbar__list-element-link` : `navbar__list-element-link`}
                    >
                        <h2 className={`navbar__list-element-title ${rancho.className}`}>Games</h2>
                    </Link>
                </li>
                <li className="navbar__list-element">
                    <Link 
                        href="/favourites" 
                        className={pathname === "/favourites" ? `active navbar__list-element-link` : `navbar__list-element-link`}
                    >
                        <h2 className={`navbar__list-element-title ${rancho.className}`}>Favourites</h2>
                    </Link>
                </li>
                <li className="navbar__list-element">
                    <Link 
                        href="/account"
                        className={pathname === "/account" ? `active navbar__list-element-link` : `navbar__list-element-link`}
                    >
                        <span className="material-symbols-outlined wideScreen">account_circle</span>
                        <h2 className={`navbar__list-element-title ${rancho.className} smallScreen`}>Account</h2>
                    </Link>
                </li>
                <li className="navbar__list-element" onClick={logout}>
                    <Link href="/">
                        <span className="material-symbols-outlined wideScreen">logout</span>
                        <h2 className={`navbar__list-element-title ${rancho.className} smallScreen`}>Logout</h2>
                    </Link>
                </li>
            </ul>

            <div id="hamburger" onClick={() => setShowMenu(!showMenu)}>
                <Image src={showMenu ? close : hamburger} width={40} height={40} alt='Hamburger menu' />
            </div>
        </nav>
    );
}