'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { rancho } from "@/fonts/fonts";
import close from "../../assets/close_icon.png";
import hamburger from "../../assets/hamburger_icon.png";

import "./NavBar.css";

export function NavBar() {
    const [ showMenu, setShowMenu ] = useState(false);
    const pathname = usePathname();
    
    return (
        <nav className="navbar">
            <ul className={showMenu ? "navbar__list showmenu" : "navbar__list"}>
                <li className="navbar__list-element">
                    <Link 
                        href="/search"
                        onClick={() => setShowMenu(false)}
                        className={pathname === "/search" ? `active navbar__list-element-link` : `navbar__list-element-link`}
                    >
                        <h2 className={`navbar__list-element-title ${rancho.className}`}>Games</h2>
                    </Link>
                </li>
                <li className="navbar__list-element">
                    <Link 
                        href="/favourites"
                        onClick={() => setShowMenu(false)}
                        className={pathname === "/favourites" ? `active navbar__list-element-link` : `navbar__list-element-link`}
                    >
                        <h2 className={`navbar__list-element-title ${rancho.className}`}>Favourites</h2>
                    </Link>
                </li>
                <li className="navbar__list-element">
                    <Link 
                        href="/login"
                        onClick={() => setShowMenu(false)}
                        className={pathname === "/login" ? `active navbar__list-element-link` : `navbar__list-element-link`}
                        >
                        <span className="material-symbols-outlined wideScreen">login</span>
                        <h2 className={`navbar__list-element-title ${rancho.className} smallScreen`}>Login</h2>
                    </Link>
                </li>
            </ul>

            <div id="hamburger" onClick={() => setShowMenu(!showMenu)}>
                <Image src={showMenu ? close : hamburger} width={40} height={40} alt='Hamburger menu' />
            </div>
        </nav>
    );
}