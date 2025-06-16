import { ReactElement } from "react";
import { EditAccountSettings } from "@/app/_components/account/EditAccountSettings";

import "./page.css";

/**
 * Change password and account-related settings.
 */
export default function AccountSettingsPage(): ReactElement {
    return (
        <main id="settingsPage">
            <EditAccountSettings />
        </main>
    );
}