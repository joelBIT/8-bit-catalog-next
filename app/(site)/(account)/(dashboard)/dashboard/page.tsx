import { ReactElement } from "react";
import { EditUserDetailsForm } from "@/app/_components/account";

import "./page.css";

/**
 * The dashboard of the account section.
 */
export default function DashboardPage(): ReactElement {

    return (
        <main id="dashboardPage">
            <article className="user-information">
                Role: Regular
            </article>

            <EditUserDetailsForm />
        </main>
    );
}