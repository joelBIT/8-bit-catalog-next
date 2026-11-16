'use client';

import { ReactElement } from "react";
import { notFound } from "next/navigation";
import { EditPasswordForm, EditNameForm } from "@/app/_components/account/forms";
import { useUser } from "@/app/_auth/client-functions";

import "./page.css";

/**
 * Change password and account-related settings.
 */
export default function AccountSettingsPage(): ReactElement {
    const user = useUser();

    if (!user) {
        notFound();
    }

    return (
        <main id="settingsPage">
            <h1 className="settings-title"> Settings </h1>

            <EditNameForm username={user.name} />
            <EditPasswordForm />
        </main>
    );
}