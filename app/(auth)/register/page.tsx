import { ReactElement } from "react";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

import "./page.css";

export default function RegisterPage(): ReactElement {
    return (
        <main id="registerPage">
            <section id="registerPage-modal">
                <section id="registerPage-form"> 
                    <RegisterForm />
                </section>

                <section id="registerPage-modal-right">
                    <Link href={"/"} className="registerPage-link"> <span className="material-symbols-outlined"> arrow_back </span> Back to catalog </Link>
                </section>
            </section>
        </main>
    );
}