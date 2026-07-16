'use client';

import { useEffect, useState, type ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { URL_DASHBOARD_PAGE, URL_FILTERS_PAGE, URL_MEMBERS_PAGE, URL_NEWSLETTER_PAGE, URL_SETTINGS_PAGE } from "@/app/_utils/utils";

import "./DashboardDropdown.css";

/**
 * Dropdown section containing a simple search field and some game recommendations.
 */
export function DashboardDropdown({show, isAdmin, closeMenu}: {show: boolean, isAdmin: boolean, closeMenu: () => void}): ReactElement {
    const [isShowing, setIsShowing] = useState<boolean>(show);
    const pathname = usePathname();

    useEffect(() => {
        setIsShowing(show);
    }, [show]);

    let adminLinks = <></>;

    if (isAdmin) {
        adminLinks =
            <>
                <Link href={URL_NEWSLETTER_PAGE} className="dashboard-list__item" onClick={() => closeMenu()}>
                    <span className={pathname === URL_NEWSLETTER_PAGE ? "active material-symbols-outlined" : "material-symbols-outlined"}> news </span> 
                    <h2 className={pathname === URL_NEWSLETTER_PAGE ? `active dashboard-link__text` : `dashboard-link__text`}> Newsletter </h2>
                </Link>

                <Link href={URL_FILTERS_PAGE} className="dashboard-list__item" onClick={() => closeMenu()}>
                    <span className={pathname === URL_FILTERS_PAGE ? "active material-symbols-outlined" : "material-symbols-outlined"}> manage_search </span> 
                    <h2 className={pathname === URL_FILTERS_PAGE ? `active dashboard-link__text` : `dashboard-link__text`}>Filters</h2>
                </Link>
            </>
    }

    return (
        <section id="dashboard-dropdown">
            <section id="dashboard-inner-content" className={isShowing ? `dropdown ${isAdmin ? " isAdmin" : ""}` : "accordion-panel"}>

                <ul className="dashboard-list">
                    <Link href={URL_DASHBOARD_PAGE} className="dashboard-list__item" onClick={() => closeMenu()}>
                        <span className={pathname === URL_DASHBOARD_PAGE ? "active material-symbols-outlined" : "material-symbols-outlined"}> dashboard </span> 
                        <h2 className={pathname === URL_DASHBOARD_PAGE ? `active dashboard-link__text` : `dashboard-link__text`}>Profile</h2>
                    </Link>

                    <Link href={URL_MEMBERS_PAGE} className="dashboard-list__item" onClick={() => closeMenu()}>
                        <span className={pathname === URL_MEMBERS_PAGE ? "active material-symbols-outlined" : "material-symbols-outlined"}> group </span> 
                        <h2 className={pathname === URL_MEMBERS_PAGE ? `active dashboard-link__text` : `dashboard-link__text`}>Members</h2>
                    </Link>

                    <Link href={URL_SETTINGS_PAGE} className="dashboard-list__item" onClick={() => closeMenu()}>
                        <span className={pathname === URL_SETTINGS_PAGE ? "active material-symbols-outlined" : "material-symbols-outlined"}> settings </span> 
                        <h2 className={pathname === URL_SETTINGS_PAGE ? `active dashboard-link__text` : `dashboard-link__text`}>Settings</h2>
                    </Link>

                    {adminLinks}
                </ul>
                
            </section>
        </section>
    )
}