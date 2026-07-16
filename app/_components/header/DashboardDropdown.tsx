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
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    useEffect(() => {
        setIsShowing(show);
    }, [show]);

        /**
     * Increase/reduce opacity when scrolling up/down at the top of the page. Should not be used when screen width is below 500px.
     */
    useEffect(() => {
        const dashboardElement = document.getElementById("dashboard-dropdown");
        if (dashboardElement && window.screenY < 10 && window.screen.width > 500) {
            dashboardElement.style.setProperty('background-color', `rgba(0,0,0,0)`);
        }
        if (scrollPosition <= 700 && dashboardElement && window.screen.width > 500) {
            dashboardElement.style.setProperty('background-color', `rgba(0,0,0,${scrollPosition / 700})`);
        } else if (dashboardElement) {
            dashboardElement.style.setProperty('background-color', `rgba(0,0,0,1)`);
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
     * Clear the input field when closing the dropdown.
     */
    function closeDropdown(): void {
        setShowDropdown(false);
    }

    let adminLinks = <></>;

    if (isAuthenticatedAdmin()) {
        adminLinks =
            <>
                <li className="dashboard-list__item">
                    <Link href={"/dashboard/newsletter"} className="dashboard-link">Newsletter</Link>
                </li>
                <li className="dashboard-list__item">
                    <Link href={"/dashboard/filters"} className="dashboard-link">Filters</Link>
                </li>
            </>
    }

    return (
        <section id="dashboard-dropdown" onMouseLeave={closeDropdown}>
            <section id="dashboard-inner-content" className={isShowing ? "dropdown" : "accordion-panel"}>

                <ul className="dashboard-list">
                    <li className="dashboard-list__item">
                        <Link href={"/dashboard"} className="dashboard-link">Profile</Link>
                    </li>
                    <li className="dashboard-list__item">
                        <Link href={"/dashboard/profile"} className="dashboard-link">Image</Link>
                    </li>
                    <li className="dashboard-list__item">
                        <Link href={"/dashboard/members"} className="dashboard-link">Members</Link>
                    </li>
                    <li className="dashboard-list__item">
                        <Link href={"/dashboard/settings"} className="dashboard-link">Settings</Link>
                    </li>

                    {adminLinks}
                </ul>
                
            </section>
        </section>
    )
}