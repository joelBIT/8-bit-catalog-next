import { ReactElement } from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";

import "./page.css";

export default function RegisterPage(): ReactElement<ReactElement> {
    return (
        <main id="registerPage">
            <RegisterForm />
        </main>
    );
}