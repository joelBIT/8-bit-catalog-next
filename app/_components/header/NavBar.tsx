'use client';

import { ReactElement, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { rancho } from "@/app/_fonts/fonts";
import { signOut } from "@/app/_session/session";
import { URL_DASHBOARD_PAGE, URL_FAVOURITES_PAGE, URL_HOME, URL_LOGIN_PAGE, URL_SEARCH_PAGE } from "@/app/_utils/utils";
import { Hamburger } from ".";

import "./NavBar.css";

/**
 * Different NavBar options will be available depending on if the user is authenticated or not. Links for Search Page and
 * Favourites Page are always rendered. The remaining links are rendered depending on if the user is authenticated or not.
 */
export function NavBar({ authenticated } : { authenticated: boolean }): ReactElement {
    const [ isChecked, setIsChecked ] = useState<boolean>(false);
    const pathname = usePathname();
    const router = useRouter();

    async function logout(): Promise<void> {
        signOut();
        setIsChecked(false);
        router.refresh();
    }

    function closeMenu(): void  {
        setIsChecked(!isChecked);
    }

    const LINKS = [
        {url: URL_SEARCH_PAGE, render: true, title: "Games", icon: null},
        {url: URL_FAVOURITES_PAGE, render: true, title: "Favourites", icon: null},
        {url: URL_LOGIN_PAGE, render: !authenticated, title: "Login", icon: "login"},
        {url: URL_DASHBOARD_PAGE, render: authenticated, title: "Account", icon: "account_circle"}
    ];
    
    return (
        <nav className="navbar">
            <ul className="navbar__list">
                {
                    LINKS.filter(link => link.render).map(link =>
                        <li className="navbar__list-element" key={link.url} onClick={closeMenu}>
                            <Link 
                                href={link.url}
                                className={pathname === link.url ? `active navbar__list-element-link` : `navbar__list-element-link`}
                            >
                                { link.icon ? <span className="material-symbols-outlined wideScreen"> {link.icon} </span> : <></> }
                                <h2 className={`navbar__list-element-title ${rancho.className} ${link.icon ? "smallScreen" : ""}`}> {link.title} </h2>
                            </Link>
                        </li>
                    )
                }

                { authenticated ?
                    <li className="navbar__list-element" onClick={logout}>
                        <Link href={URL_HOME}>
                            <span className="material-symbols-outlined wideScreen">logout</span>
                            <h2 className={`navbar__list-element-title ${rancho.className} smallScreen`}> Logout </h2>
                        </Link>
                    </li>
                    : <></>
                }
            </ul>

            <Hamburger checked={isChecked} setCheck={setIsChecked}/>
        </nav>
    );
}