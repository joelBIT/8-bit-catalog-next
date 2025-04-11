import { ReactElement } from "react";
import { Params } from "next/dist/server/request/params";
import { activateAccount, copyProfileImageToFolder } from "@/db/db";

import "./page.css";

/**
 * When an account is activated a folder is created in storage for that account. This folder contains the account-specific profile images.
 */
export default async function ActivationPage({ params }: { params: Promise<Params> }): Promise<ReactElement> {
    const { code } = await params;

    const activated = await activateAccount(code as string);
    await copyProfileImageToFolder(code as string);

    return (
        <main id="activationPage">
            { activated ? <h1> Account is activated. You can now log in. </h1> : <h1> Account could not be activated </h1> }
        </main>
    );
}