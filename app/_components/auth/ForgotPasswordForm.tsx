'use client';

import { ReactElement, useState } from "react";
import Link from "next/link";
import { authClient } from "@/app/auth-client";
import { URL_LOGIN_PAGE, URL_REGISTER_PAGE, URL_RESET_PAGE } from "@/app/_utils/utils";

import "./ForgotPasswordForm.css";

/**
 * Form used when resetting a forgotten password for an account. An email containing the new password 
 * is sent to the supplied mail address.
 */
export function ForgotPasswordForm(): ReactElement {
    const [email, setEmail] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [showMessage, setShowMessage] = useState<boolean>(false);

    async function resetPassword() {
        const { error } = await authClient.requestPasswordReset({
            email,
            redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN_URL}${URL_RESET_PAGE}`
        });

        if (error) {
            setSuccess(false);
            setMessage("Could not reset password");
        } else {
            setSuccess(true);
            setMessage("Password changed. Check email for link.");
        }
        setShowMessage(true);
    }

    let messageContent = <></>;

    if (showMessage) {
        messageContent =
            <>
                <h2 className={success ? "message-success message-fade" : "message-failure message-fade"}>
                    {message}
                </h2>
            </>
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

                {messageContent}
                
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