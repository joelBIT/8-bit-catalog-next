'use client';

import { ReactElement } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/auth/session";
import { URL_DASHBOARD_PAGE, URL_FILTERS_PAGE, URL_PROFILE_PAGE, URL_SETTINGS_PAGE, USER_ROLE_ADMIN } from "@/utils/utils";
import { User } from "@/types/types";

import "./AccountMenu.css";

/**
 * Used to navigate between account-specific sections.
 */
export function AccountMenu({ user } : { user: User }): ReactElement {
    const pathname = usePathname();
    const router = useRouter();

    async function logout(event: React.MouseEvent<HTMLAnchorElement>): Promise<void> {
        event.preventDefault();
        signOut();
        router.refresh();
    }

    return (
        <div id="accountMenu-wrapper">
            <input id="hamburger-side" type="checkbox" />
            <label htmlFor="hamburger-side" className="hamburger-side">
                <i></i>
                <div className="text">
                    <h3 className="close">close</h3>
                    <h3 className="open">menu</h3>
                </div>
            </label>

            <section id="accountMenu">
                <article id="pages">
                    <h1 className="pages-title">Pages</h1>

                    <Link href={URL_DASHBOARD_PAGE} className={pathname === URL_DASHBOARD_PAGE ? "account-menu__link active" : "account-menu__link"}>
                        <span className="material-symbols-outlined" title="Dashboard"> dashboard </span> 
                        <h1 className="menu__link-title"> Dashboard </h1> 
                    </Link>

                    <Link href={URL_PROFILE_PAGE} className={pathname === URL_PROFILE_PAGE ? "account-menu__link active" : "account-menu__link"}> 
                        <span className="material-symbols-outlined" title="Profile"> person </span>
                        <h1 className="menu__link-title"> Profile </h1>
                    </Link>

                    {
                        user?.role === USER_ROLE_ADMIN ?
                            <Link href={URL_FILTERS_PAGE} className={pathname === URL_FILTERS_PAGE ? "account-menu__link active" : "account-menu__link"}> 
                                <span className="material-symbols-outlined" title="Search filters"> manage_search </span>
                                <h1 className="menu__link-title"> Filters </h1>
                            </Link>
                        : <></>
                    }

                    <Link href={URL_SETTINGS_PAGE} className={pathname === URL_SETTINGS_PAGE ? "account-menu__link active" : "account-menu__link"}> 
                        <span className="material-symbols-outlined" title="Settings"> settings </span> 
                        <h1 className="menu__link-title"> Settings </h1>
                    </Link>

                    <Link href="#" className="account-menu__link logout-link" onClick={logout}> 
                        <span className="material-symbols-outlined" title="Logout"> power_settings_new </span> 
                        <h1 className="menu__link-title"> Logout </h1>
                    </Link>
                </article>
            </section>
        </div>
    );
}