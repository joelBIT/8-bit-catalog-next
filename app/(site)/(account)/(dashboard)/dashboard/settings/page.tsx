'use client';

import { ReactElement } from "react";
import { EditPasswordForm, EditNameForm } from "@/app/_components/account/forms";
import { getUser } from "@/app/_auth/client-functions";

import "./page.css";

/**
 * Change password and account-related settings.
 */
export default function AccountSettingsPage(): ReactElement {
    const user = getUser();

    return (
        <main id="settingsPage">
            <h1 className="settings-title"> Settings </h1>

            <EditNameForm user={user} />
            <EditPasswordForm />
        </main>
    );
}