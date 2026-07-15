'use client';

import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useFavourites } from "@/app/_hooks";
import { URL_TIMELINE_PAGE, URL_DASHBOARD_PAGE, URL_FAVOURITES_PAGE, URL_HOME, URL_LOGIN_PAGE, URL_SEARCH_PAGE } from "@/app/_utils/utils";
import { Hamburger } from ".";
import { signOut } from "@/app/_auth/client-functions";

import "./NavBar.css";

/**
 * Different NavBar options will be available depending on if the user is authenticated or not. Links for Search Page and
 * Favourites Page are always rendered. The remaining links are rendered depending on if the user is authenticated or not.
 */
export function NavBar({ authenticated } : { authenticated: boolean }): ReactElement {
    const { favouritesList } = useFavourites();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const pathname = usePathname();
    const router = useRouter();

    /**
     * Increase/reduce opacity when scrolling up/down at the top of the page. Should not be used when screen width is below 500px.
     */
    useEffect(() => {
        const headerElement = document.getElementById("header");
        if (headerElement && window.screenY < 10 && window.screen.width > 500) {
            headerElement.style.setProperty('background-color', `rgba(0,0,0,0)`);
        }
        if (scrollPosition <= 700 && headerElement && window.screen.width > 500) {
            headerElement.style.setProperty('background-color', `rgba(0,0,0,${scrollPosition / 700})`);
        } else if (headerElement) {
            headerElement.style.setProperty('background-color', `rgba(0,0,0,1)`);
        }
    })

    useEffect(() => {
        window.addEventListener("scroll", trackVerticalScroll, false);

        return () => {
            window.removeEventListener("scroll", trackVerticalScroll, false);
        };
    }, []);

    /**
     * Keep track of vertical scroll in order to increase/decrease header opacity.
     */
    function trackVerticalScroll(): void {
        setScrollPosition(window.scrollY);
    }

    /**
     * Log out and update header to only show navbar links that are available to unauthenticated users.
     */
    async function logout(): Promise<void> {
        await signOut(() => router.push(URL_LOGIN_PAGE));
        setIsChecked(false);
    }

    /**
     * Close Hamburger menu when choosing a menu alternative.
     */
    function closeMenu(): void  {
        setIsChecked(!isChecked);
    }

    const LINKS_FIRST = [
        {url: URL_HOME, render: true, title: "Home"},
        {url: URL_SEARCH_PAGE, render: true, title: "Games"}
    ];

    const LINKS_LAST = [
        {url: URL_TIMELINE_PAGE, render: true, title: "Timeline"},
        {url: URL_LOGIN_PAGE, render: !authenticated, title: "Sign in"},
        {url: URL_DASHBOARD_PAGE, render: authenticated, title: "Dashboard"}
    ];

    let logoutOption = <></>

    if (authenticated) {
        logoutOption = 
            <li className="navbar__list-element" onClick={logout}>
                <Link href={URL_HOME} className="navbar__list-element-link" title="Logout">
                    <h2 className="navbar__list-element-title"> Logout </h2>
                </Link>
            </li>
    }
    
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
                                <h2 className="navbar__list-element-title"> {link.title} </h2>
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
                                className={pathname === link.url ? `active navbar__list-element-link` : `navbar__list-element-link`}
                                title={link.url !== URL_TIMELINE_PAGE ? link.title : ""}
                            >
                                <h2 className="navbar__list-element-title"> {link.title} </h2>
                            </Link>
                        </li>
                    )
                }

                { logoutOption }
            </ul>

            <Hamburger checked={isChecked} setCheck={setIsChecked}/>
        </nav>
    );
}