'use client';

import { ReactElement, useContext, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FavouritesContext } from "@/app/_contexts";
import { signOut } from "@/app/_session/session";
import { URL_ABOUT_PAGE, URL_DASHBOARD_PAGE, URL_FAVOURITES_PAGE, URL_HOME, URL_LOGIN_PAGE, URL_SEARCH_PAGE } from "@/app/_utils/utils";
import { Hamburger } from ".";

import "./NavBar.css";

/**
 * Different NavBar options will be available depending on if the user is authenticated or not. Links for Search Page and
 * Favourites Page are always rendered. The remaining links are rendered depending on if the user is authenticated or not.
 */
export function NavBar({ authenticated } : { authenticated: boolean }): ReactElement {
    const { favouritesList } = useContext(FavouritesContext);
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

    const LINKS_FIRST = [
        {url: URL_HOME, render: true, title: "Home", icon: null},
        {url: URL_SEARCH_PAGE, render: true, title: "Games", icon: null}
    ];

    const LINKS_LAST = [
        {url: URL_ABOUT_PAGE, render: true, title: "About", icon: null},
        {url: URL_LOGIN_PAGE, render: !authenticated, title: "Login", icon: "login"},
        {url: URL_DASHBOARD_PAGE, render: authenticated, title: "Account", icon: "account_circle"}
    ];
    
    return (
        <nav className="navbar">
            <ul className="navbar__list">
                {
                    LINKS_FIRST.filter(link => link.render).map(link =>
                        <li className="navbar__list-element" key={link.url} onClick={closeMenu}>
                            <Link 
                                href={link.url}
                                className={pathname === link.url ? `active navbar__list-element-link` : `navbar__list-element-link`}
                            >
                                { link.icon ? <span className="material-symbols-outlined wideScreen"> {link.icon} </span> : <></> }
                                <h2 className={`navbar__list-element-title ${link.icon ? "smallScreen" : ""}`}> {link.title} </h2>
                            </Link>
                        </li>
                    )
                }

                <li className="navbar__list-element" key={URL_FAVOURITES_PAGE} onClick={closeMenu}>
                    <Link 
                        href={URL_FAVOURITES_PAGE}
                        className={pathname === URL_FAVOURITES_PAGE ? `active navbar__list-element-link` : `navbar__list-element-link`}
                    >
                        <h2 id="favourite-link" className="navbar__list-element-title"> 
                            Favourites
                            { 
                                favouritesList?.length > 0 ? 
                                    <p id="favourites-amount" className="material-symbols-outlined"> 
                                        {favouritesList?.length} 
                                    </p> : <></> 
                            }
                        </h2>
                    </Link>
                </li>

                {
                    LINKS_LAST.filter(link => link.render).map(link =>
                        <li className="navbar__list-element" key={link.url} onClick={closeMenu}>
                            <Link 
                                href={link.url}
                                prefetch={link.url === URL_ABOUT_PAGE}
                                className={pathname === link.url ? `active navbar__list-element-link` : `navbar__list-element-link`}
                                title={link.url !== URL_ABOUT_PAGE ? link.title : ""}
                            >
                                { link.icon ? <span className="material-symbols-outlined wideScreen"> {link.icon} </span> : <></> }
                                <h2 className={`navbar__list-element-title ${link.icon ? "smallScreen" : ""}`}> {link.title} </h2>
                            </Link>
                        </li>
                    )
                }

                { 
                    authenticated ?
                        <li className="navbar__list-element" onClick={logout}>
                            <Link href={URL_HOME} className="navbar__list-element-link" title="Logout">
                                <span className="material-symbols-outlined wideScreen">logout</span>
                                <h2 className="navbar__list-element-title smallScreen"> Logout </h2>
                            </Link>
                        </li>
                    : <></>
                }
            </ul>

            <Hamburger checked={isChecked} setCheck={setIsChecked}/>
        </nav>
    );
}