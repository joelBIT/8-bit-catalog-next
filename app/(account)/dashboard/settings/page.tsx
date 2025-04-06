import { ReactElement } from "react";
import { EditAccountSettings } from "@/components/account/EditAccountSettings";

import "./page.css";

export default function SettingsPage(): ReactElement {
    return (
        <main id="settingsPage">
            <h1>Settings</h1>
            <EditAccountSettings />
        </main>
    );
}