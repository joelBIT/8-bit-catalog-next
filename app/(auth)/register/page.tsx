import { ReactElement } from "react";
import Link from "next/link";
import { RegisterForm } from "@/app/_components/auth/RegisterForm";

import "./page.css";

export default function RegisterPage(): ReactElement {
    return (
        <main id="registerPage">
            <section id="registerPage-modal">
                <section id="registerPage-modal-back">
                    <Link href={"/"} className="registerPage-link"> 
                        <span className="material-symbols-outlined"> arrow_back </span> 
                        <h2 className="registerPage-link__text"> Back to catalog </h2> 
                    </Link>
                </section>

                <section id="registerPage-form">
                    <RegisterForm />
                </section>
            </section>
        </main>
    );
}