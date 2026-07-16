'use client';

import { useEffect, useState, type ReactElement } from "react";
import Link from "next/link";
import { isAuthenticatedAdmin } from "@/app/_auth/client-functions";

import "./DashboardDropdown.css";

/**
 * Dropdown section containing a simple search field and some game recommendations.
 */
export function DashboardDropdown({show, setShowDropdown}: {show: boolean, setShowDropdown: (show: boolean) => void}): ReactElement {
    const [isShowing, setIsShowing] = useState<boolean>(show);
    const [isAdmin] = useState<boolean>(isAuthenticatedAdmin());

    useEffect(() => {
        setIsShowing(show);
    }, [show]);

    let adminLinks = <></>;

    if (isAdmin) {
        adminLinks =
            <>
                <Link href={"/dashboard/newsletter"} className="dashboard-list__item" onClick={() => setShowDropdown(false)}>
                    <span className="material-symbols-outlined"> news </span> 
                    <h2 className="dashboard-link__text"> Newsletter </h2>
                </Link>

                <Link href={"/dashboard/filters"} className="dashboard-list__item" onClick={() => setShowDropdown(false)}>
                    <span className="material-symbols-outlined"> manage_search </span> 
                    <h2 className="dashboard-link__text">Filters</h2>
                </Link>
            </>
    }

    return (
        <section id="dashboard-dropdown">
            <section id="dashboard-inner-content" className={isShowing ? `dropdown ${isAdmin ? " isAdmin" : ""}` : "accordion-panel"}>

                <ul className="dashboard-list">
                    <Link href={"/dashboard"} className="dashboard-list__item" onClick={() => setShowDropdown(false)}>
                        <span className="material-symbols-outlined"> dashboard </span> 
                        <h2 className="dashboard-link__text">Profile</h2>
                    </Link>

                    <Link href={"/dashboard/profile"} className="dashboard-list__item" onClick={() => setShowDropdown(false)}>
                        <span className="material-symbols-outlined"> person </span> 
                        <h2 className="dashboard-link__text">Image</h2>
                    </Link>

                    <Link href={"/dashboard/members"} className="dashboard-list__item" onClick={() => setShowDropdown(false)}>
                        <span className="material-symbols-outlined"> group </span> 
                        <h2 className="dashboard-link__text">Members</h2>
                    </Link>

                    <Link href={"/dashboard/settings"} className="dashboard-list__item" onClick={() => setShowDropdown(false)}>
                        <span className="material-symbols-outlined"> settings </span> 
                        <h2 className="dashboard-link__text">Settings</h2>
                    </Link>

                    {adminLinks}
                </ul>
                
            </section>
        </section>
    )
}