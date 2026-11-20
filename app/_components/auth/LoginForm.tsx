'use client';

import { ReactElement, useRef, useActionState, useState } from "react";
import Link from "next/link";
import { login } from "@/app/_actions/login";
import { URL_FORGOT_PAGE, URL_REGISTER_PAGE } from "@/app/_utils/utils";
import { StateMessage } from "../common";

import "./LoginForm.css";

/**
 * A user enter credentials (email and password) into this form and submits the form to access an account.
 * It is also possible to navigate to the register page as well as the 'forgot password' page.
 */
export function LoginForm(): ReactElement {
    const [state, formAction, isPending] = useActionState(login, { message: '', success: false });
    const [isVisible, setVisible] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <section id="loginCard">
            <form id="loginForm" ref={formRef} action={formAction}>
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

                    <section className="input">
                        <input 
                            id="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type={isVisible ? "text" : "password"}
                            placeholder="PASSWORD"
                            className="form__field"
                            autoComplete="none" 
                            required 
                        />

                        <span className="form__field-label">
                            Password
                        </span>

                        <button 
                            type="button" 
                            className="material-symbols-outlined password-show" 
                            aria-label={isVisible ? "Hide password" : "Show password"}
                            onClick={() => setVisible(!isVisible)}
                        >
                            {isVisible ? "visibility_off" : "visibility"}
                        </button>
                    </section>
                </section>

                <StateMessage state={state} />
                
                <button className="authButton" type="submit" disabled={!password || !email || isPending}>
                    <span className="authButton__text"> {isPending ? 'Signing in...' : 'Sign in'} </span>
                </button>
            </form>

            <section id="register-forgot-links" className="input">
                <Link id="register-link" href={URL_REGISTER_PAGE} className="form__field"> Register </Link>

                <Link id="forgot-password-link" href={URL_FORGOT_PAGE} className="form__field"> Forgot password </Link>
            </section>
        </section>
    );
}