import { ReactElement } from "react";
import { EditEmailForm, EditPasswordForm, EditNameForm } from "@/app/_components/account/forms";

import "./page.css";

/**
 * Change password and account-related settings.
 */
export default function AccountSettingsPage(): ReactElement {
    return (
        <main id="settingsPage">
            <EditEmailForm />
            <EditNameForm />
            <EditPasswordForm />
        </main>
    );
}