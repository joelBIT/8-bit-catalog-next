'use client';

import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/app/_components/auth/LoginForm";
import { authClient } from "@/app/auth-client";

import "./page.css";

/**
 * Page for signing in to an account.
 */
export default function LoginPage(): ReactElement {

    async function socialSignIn(): Promise<void> {
        await authClient.signIn.social({
            provider: "google"
        });
    }

    return (
        <main id="loginPage">
            <section id="loginPage-modal">
                <section id="loginPage-modal-back">
                    <Link href={"/"} className="loginPage-link"> 
                        <span className="material-symbols-outlined"> arrow_back </span> 
                        <h2 className="loginPage-link__text"> Back to catalog </h2>
                    </Link>
                </section>

                <section id="loginPage-alternatives">
                    <article className="provider-login" onClick={socialSignIn}>
                        <Image src="/auth/google.png" alt="Google logo" width={40} height={40} className="provider-image" />
                        <h2 className="provider-text">Sign in with Google</h2>
                    </article>

                    <p className="alternatives-text"> OR </p>

                    <LoginForm />
                </section>
            </section>
        </main>
    );
}