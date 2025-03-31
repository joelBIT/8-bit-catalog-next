import { ReactElement } from "react";
import { Params } from "next/dist/server/request/params";
import { activateAccount } from "@/db/db";

import "./page.css";


export default async function ActivationPage({ params }: { params: Promise<Params> }): Promise<ReactElement> {
    const { code } = await params;

    const activated = await activateAccount(code as string);

    return (
        <main id="activationPage">
            { activated ? <h1> Account is activated. You can now log in. </h1> : <h1> Account could not be activated </h1> }
        </main>
    );
}