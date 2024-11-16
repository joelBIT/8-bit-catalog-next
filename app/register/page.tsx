import { ReactElement } from "react";
import { RegisterForm } from "@/components/account/RegisterForm";

import "./page.css";

export default function RegisterPage(): ReactElement {
    return (
        <main id="registerPage">
            <RegisterForm />
        </main>
    );
}