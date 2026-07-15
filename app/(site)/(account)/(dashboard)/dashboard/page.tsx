import { ReactElement } from "react";
import { EditProfileForm } from "@/app/_components/account/forms";
import { getUser } from "@/app/_auth/server-functions";
import { getProfileByUserId } from "@/app/_db/profiles-db";

import "./page.css";

/**
 * The dashboard of the account section.
 */
export default async function DashboardPage(): Promise<ReactElement> {

    return (
        <main id="dashboardPage">
            <h1 className="dashboard-title"> Profile </h1>

            <EditProfileForm profile={await getProfileByUserId((await getUser()).id)} />
        </main>
    );
}