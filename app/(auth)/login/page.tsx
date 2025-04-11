import { ReactElement } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

import "./page.css";

export default function LoginPage(): ReactElement {

    return (
        <main id="loginPage">
            <LoginForm />
        </main>
    );
}