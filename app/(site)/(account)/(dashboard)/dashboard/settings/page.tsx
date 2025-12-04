import { ReactElement } from "react";
import { EditEmailForm, EditPasswordForm, EditUsernameForm } from "@/app/_components/account";

import "./page.css";

/**
 * Change password and account-related settings.
 */
export default function AccountSettingsPage(): ReactElement {
    return (
        <main id="settingsPage">
            <EditEmailForm />
            <EditUsernameForm />
            <EditPasswordForm />
        </main>
    );
}