'use client';

import { ReactElement, useActionState, useState } from "react";
import Link from "next/link";
import { resetPassword } from "@/app/_actions/auth";
import { arima } from "@/app/_fonts/fonts";
import { URL_LOGIN_PAGE, URL_REGISTER_PAGE } from "@/app/_utils/utils";

import "./ResetPasswordForm.css";

/**
 * Form used when resetting a forgotten password for an account. An email containing the new password 
 * is sent to the supplied mail address.
 */
export function ResetPasswordForm(): ReactElement {
    const [ state, formAction ] = useActionState(resetPassword, { message: '', success: false });
    const [ email, setEmail ] = useState<string>('');

    return (
        <section id="resetPasswordCard" className={arima.className}>
            { 
                state?.message ? 
                    <h2 className={state?.success ? "message-success" : "message-failure"}>
                        {state?.message}
                    </h2> : <></> 
            }

            <form id="resetPasswordForm" action={formAction}>
                <section id="login-input">
                    <section className="input">
                        <input 
                            id="email"
                            name="email" 
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email"
                            className={`${arima.className} form__field`}
                            autoComplete="off" 
                            required 
                        />

                        <span className="form__field-label">
                            Email
                        </span>
                    </section>
                </section>
                
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