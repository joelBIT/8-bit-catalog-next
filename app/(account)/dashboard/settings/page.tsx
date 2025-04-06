import { ReactElement } from "react";
import { EditAccountSettings } from "@/components/account/EditAccountSettings";

import "./page.css";

export default function AccountSettingsPage(): ReactElement {
    return (
        <main id="settingsPage">
            <h1 className="settingsPage__title">Edit account settings</h1>
            <EditAccountSettings />
        </main>
    );
}