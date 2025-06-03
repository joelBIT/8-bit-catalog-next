'use client';

import { ReactElement, useRef, useActionState, useState } from "react";
import Link from "next/link";
import { URL_FORGOT_PAGE, URL_REGISTER_PAGE } from "@/app/_utils/utils";
import { arima, irishGrover } from "@/app/_fonts/fonts";
import { login } from "@/app/_actions/auth";

import "./LoginForm.css";

/**
 * A user enter credentials (email and password) into this form and submits the form to access an account.
 * It is also possible to navigate to the register page as well as the 'forgot password' page.
 */
export function LoginForm(): ReactElement {
    const [ state, formAction ] = useActionState(login, { message: '', success: false });
    const [ isVisible, setVisible ] = useState<boolean>(false);
    const [ password, setPassword ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const formRef = useRef<HTMLFormElement>(null);

    if (formRef.current) {
        formRef.current?.reset();
    }

    return (
        <section id="loginCard" className={arima.className}>
            { 
                state?.message ? 
                    <h2 className={state?.success ? "message-success" : "message-failure"}>
                        {state?.message}
                    </h2> : <></> 
            }
            
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
                            className={`${arima.className} form__field`}
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
                            className={`${arima.className} form__field`}
                            autoComplete="off" 
                            required 
                        />

                        <span className="form__field-label">
                            Password
                        </span>

                        <span className="material-symbols-outlined password-show" onClick={() => setVisible(!isVisible)}>
                            {isVisible ? "visibility_off" : "visibility"}
                        </span>
                    </section>
                </section>
                
                <button className={`authButton ${irishGrover.className}`} type="submit" disabled={!password || !email}>
                    <span className="authButton__text"> Sign in </span>
                </button>
            </form>

            <section id="register-forgot-links" className="input">
                <Link id="register-link" href={URL_REGISTER_PAGE} className="form__field"> Register </Link>

                <Link id="forgot-password-link" href={URL_FORGOT_PAGE} className="form__field"> Forgot password </Link>
            </section>
        </section>
    );
}