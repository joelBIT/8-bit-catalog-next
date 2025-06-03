import { ReactElement } from "react";
import Link from "next/link";
import { LoginForm } from "@/app/_components/auth/LoginForm";
import { URL_REGISTER_PAGE } from "@/app/_utils/utils";

import "./page.css";

/**
 * Page for signing in to an account.
 */
export default function LoginPage(): ReactElement {

    return (
        <main id="loginPage">
            <section id="loginPage-modal">
                <section id="loginPage-modal-back">
                    <Link href={"/"} className="loginPage-link"> 
                        <span className="material-symbols-outlined"> arrow_back </span> 
                        <h2 className="loginPage-link__text"> Back to catalog </h2>
                    </Link>
                </section>

                <section id="loginPage-form">
                    <LoginForm />
                </section>

                <section id="register-link">
                    <h2 className="register-link__text"> Need an account? </h2> 
                    <Link href={URL_REGISTER_PAGE} className="loginCard__create-account-link"> Register </Link>
                </section>
            </section>
        </main>
    );
}