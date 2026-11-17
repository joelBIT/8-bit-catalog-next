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
    const currentUser = useUser();

    if (!currentUser.user) {
        notFound();
    }

    return (
        <main id="settingsPage">
            <h1 className="settings-title"> Settings </h1>

            <EditNameForm username={currentUser.user.name} />
            <EditPasswordForm />
        </main>
    );
}