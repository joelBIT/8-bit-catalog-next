'use client';

import { ReactElement, useContext } from "react";
import { AccountContext } from "@/contexts/AccountContextProvider";
import { EditUserDetailsForm } from "@/components/account";

import "./page.css";

/**
 * The dashboard of the account section.
 */
export default function DashboardPage(): ReactElement {
    const { user } = useContext(AccountContext);

    return (
        <main id="dashboardPage">
            <article className="user-information">
                <h1> Role: { user.role } </h1>
                <h1> Email: { user.email } </h1>
            </article>

            <EditUserDetailsForm />
        </main>
    );
}