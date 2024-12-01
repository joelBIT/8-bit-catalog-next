'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { rancho } from "@/fonts/fonts";
import { useAuth } from '@/contexts/AuthContext';

import "./Navbar.css";

export function NavBar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    
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
                { user ? <li className="navbar__list-element">
                            <Link href="/account">
                                <span className="material-symbols-outlined wideScreen">account_circle</span>
                                <h2 className={`navbar__list-element-title ${rancho.className} smallScreen`}>Account</h2>
                            </Link>
                        </li> : <></> }
                { !user ? <li className="navbar__list-element">
                            <Link href="/login">
                                <span className="material-symbols-outlined wideScreen">login</span>
                                <h2 className={`navbar__list-element-title ${rancho.className} smallScreen`}>Login</h2>
                            </Link>
                        </li> : <></> }
                { user ? <li className="navbar__list-element" onClick={logout}>
                            <Link href="/">
                                <span className="material-symbols-outlined wideScreen">logout</span>
                                <h2 className={`navbar__list-element-title ${rancho.className} smallScreen`}>Logout</h2>
                            </Link>
                        </li> : <></> }
            </ul>
        </nav>
    );
}