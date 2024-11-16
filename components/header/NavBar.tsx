'use client';

import { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { rancho } from "@/fonts/fonts";

import "./Navbar.css";

export function NavBar(): ReactElement {
    const pathname = usePathname();
    
    return (
        <nav className="navbar">
            <ul className="navbar__list">
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
            </ul>
        </nav>
    );
}