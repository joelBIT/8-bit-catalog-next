'use client';

import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { RegisterForm } from "@/app/_components/auth/RegisterForm";
import { authClient } from "@/app/auth-client";

import "./page.css";

/**
 * Page for registering a new user.
 */
export default function RegisterPage(): ReactElement {

    async function socialSignIn(): Promise<void> {
        await authClient.signIn.social({
            provider: "google"
        });
    }
    
    return (
        <main id="registerPage">
            <section id="registerPage-modal">
                <section id="registerPage-modal-back">
                    <Link href={"/"} className="registerPage-link"> 
                        <span className="material-symbols-outlined"> arrow_back </span> 
                        <h2 className="registerPage-link__text"> Back to catalog </h2> 
                    </Link>
                </section>

                <section id="registerPage-alternatives">
                    <article className="provider-login" onClick={socialSignIn}>
                        <Image src="/auth/google.png" alt="Google logo" width={40} height={40} className="provider-image" />
                        <h2 className="provider-text">Sign up with Google</h2>
                    </article>

                    <p className="alternatives-text"> OR </p>

                    <RegisterForm />
                </section>
            </section>
        </main>
    );
}