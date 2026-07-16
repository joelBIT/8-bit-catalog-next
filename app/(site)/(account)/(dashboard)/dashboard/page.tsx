import { ReactElement } from "react";
import { EditProfileForm, EditProfileImageForm } from "@/app/_components/account/forms";
import { getUser } from "@/app/_auth/server-functions";
import { getProfileByUserId } from "@/app/_db/profiles-db";

import "./page.css";

/**
 * The dashboard of the account section.
 */
export default async function DashboardPage(): Promise<ReactElement> {
    const profile = await getProfileByUserId((await getUser()).id);

    return (
        <main id="dashboardPage">
            <h1 className="dashboard-title"> Profile </h1>

            <section id="dashboardContent">
                <EditProfileImageForm profile={profile} />
                <EditProfileForm profile={profile} />
            </section>
        </main>
    );
}