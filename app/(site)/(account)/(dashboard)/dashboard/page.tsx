import { ReactElement } from "react";
import { EditProfileForm, EditProfileImageForm } from "@/app/_components/account/forms";
import { requireUser } from "@/app/_auth/server-functions";
import { getProfileByUserId } from "@/app/_db/profiles-db";

import "./page.css";

/**
 * The dashboard of the account section.
 */
export default async function DashboardPage(): Promise<ReactElement> {
    const currentUser = await requireUser();
    const profile = await getProfileByUserId(currentUser.id);

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