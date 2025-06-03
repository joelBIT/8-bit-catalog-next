import { ReactElement } from "react";
import Link from "next/link";
import { LoginForm } from "@/app/_components/auth/LoginForm";

import "./page.css";

export default function LoginPage(): ReactElement {

    return (
        <main id="loginPage">
            <section id="loginPage-modal">
                <section id="loginPage-modal-back">
                    <Link href={"/"} className="loginPage-link"> <span className="material-symbols-outlined"> arrow_back </span> Back to catalog </Link>
                </section>

                <section id="loginPage-form">
                    <LoginForm />
                </section>
            </section>
        </main>
    );
}