import { ReactElement } from "react";
import { EditProfileForm } from "@/app/_components/account/forms";
import { Profile } from "@/app/_db/schema/profiles";

import "./page.css";

/**
 * The dashboard of the account section.
 */
export default function DashboardPage(): ReactElement {
    const profile = {} as Profile;      //getProfile

    return (
        <main id="dashboardPage">
            <h1 className="dashboard-title"> Profile </h1>

            <EditProfileForm profile={profile} />
        </main>
    );
}