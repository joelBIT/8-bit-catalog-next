import { ReactElement } from "react";
import { LoginForm } from "@/components/account/LoginForm";

import "./page.css";

export default function LoginPage(): ReactElement<ReactElement> {

    return (
        <main id="loginPage">
            <LoginForm />
        </main>
    );
}