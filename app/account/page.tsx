import { ReactElement } from "react";

import "./page.css";

export default async function AccountPage(): Promise<ReactElement<ReactElement>> {

    return (
        <main id="accountPage">
            <h1> Logged in </h1>
        </main>
    );
}