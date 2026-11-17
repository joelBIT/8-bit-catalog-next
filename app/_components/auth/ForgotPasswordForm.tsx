'use client';

import { ReactElement, useState } from "react";
import Link from "next/link";
import { authClient } from "@/app/auth-client";
import { URL_LOGIN_PAGE, URL_REGISTER_PAGE, URL_RESET_PAGE } from "@/app/_utils/utils";
import { FlashMessage } from "../common";
import { ActionState } from "@/app/_types/types";

import "./ForgotPasswordForm.css";

/**
 * Form used when resetting a forgotten password for an account. An email containing the new password 
 * is sent to the supplied mail address.
 */
export function ForgotPasswordForm(): ReactElement {
    const [email, setEmail] = useState<string>('');
    const [feedback, setFeedback] = useState<ActionState>({ message: '', success: false });

    async function resetPassword() {
        const { error } = await authClient.requestPasswordReset({
            email,
            redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN_URL}${URL_RESET_PAGE}`
        });

        if (error) {
            setFeedback({ message: error.message ?? "Could not update password", success: false });
        } else {
            setFeedback({ message: "If an account exists for that email, a reset link has been sent.", success: true });
            setEmail('');
        }
    }

    return (
        <section id="resetPasswordCard">
            <form id="resetPasswordForm" action={resetPassword}>
                <section id="login-input">
                    <section className="input">
                        <input 
                            id="email"
                            name="email" 
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email"
                            className="form__field"
                            autoComplete="off" 
                            required 
                        />

                        <span className="form__field-label">
                            Email
                        </span>
                    </section>
                </section>

                <FlashMessage state={feedback} />
                
                <button className="authButton" type="submit" disabled={!email}>
                    <span className="authButton__text"> Send Reset Mail </span>
                </button>
            </form>

            <section id="register-login-links" className="input">
                <Link id="register-link" href={URL_REGISTER_PAGE} className="form__field"> Register </Link>

                <Link id="login-link" href={URL_LOGIN_PAGE} className="form__field"> Sign in </Link>
            </section>
        </section>
    );
}