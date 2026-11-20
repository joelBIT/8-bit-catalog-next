import { ReactElement } from "react";
import { requireUser } from "@/app/_auth/server-functions";
import { EditPasswordForm, EditNameForm } from "@/app/_components/account/forms";

import "./page.css";

/**
 * Change password and account-related settings.
 */
export default async function AccountSettingsPage(): Promise<ReactElement> {
    const currentUser = await requireUser();

    return (
        <main id="settingsPage">
            <h1 className="settings-title"> Settings </h1>

            <EditNameForm username={currentUser.name} />
            <EditPasswordForm />
        </main>
    );
}