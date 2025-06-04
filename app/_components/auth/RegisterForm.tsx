'use client';

import { ReactElement, useRef, useActionState, useState } from "react";
import Link from "next/link";
import { arima, irishGrover } from "@/app/_fonts/fonts";
import { URL_LOGIN_PAGE } from "@/app/_utils/utils";
import { register } from "@/app/_actions/auth";
import { UsernameInput, PasswordInput } from "../common";

import "./RegisterForm.css";

/**
 * Enter information and submit form in order to register a new user.
 */
export function RegisterForm(): ReactElement {
    const [state, formAction] = useActionState(register, { message: '', success: false });
    const [ isVisible, setVisible ] = useState<boolean>(false);
    const [ isVisibleRepeat, setVisibleRepeat ] = useState<boolean>(false);
    const [ password, setPassword ] = useState<string>('');
    const [ passwordRepeat, setPasswordRepeat ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const formRef = useRef<HTMLFormElement>(null);

    if (formRef.current) {
        formRef.current?.reset();
    }

    return (
        <>
            { 
                state.success ?  
                    <p className="message-confirmation"> A confirmation link will be sent to your email </p>  
                    :
                    <section id="registerCard" className={arima.className}>
                        { 
                            state?.message ? 
                                <h2 className={state?.success ? "message-success" : "message-failure"}>
                                    {state?.message}
                                </h2> : <></> 
                        }

                        <form id="registerForm" ref={formRef} action={formAction}>
                            <section id="register-input">
                                <section className="input">
                                    <input 
                                        id="email"
                                        name="email" 
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="SET EMAIL"
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
                                        placeholder="SET PASSWORD"
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

                                <section className="input">
                                    <input 
                                        id="passwordRepeat"
                                        name="passwordRepeat"
                                        value={passwordRepeat}
                                        onChange={e => setPasswordRepeat(e.target.value)}
                                        type={isVisibleRepeat ? "text" : "password"}
                                        placeholder="CONFIRM PASSWORD"
                                        className={`${arima.className} form__field`}
                                        autoComplete="off" 
                                        required 
                                    />

                                    <span className="form__field-label">
                                        Confirm Password
                                    </span>

                                    <span className="material-symbols-outlined password-show" onClick={() => setVisibleRepeat(!isVisibleRepeat)}>
                                        {isVisibleRepeat ? "visibility_off" : "visibility"}
                                    </span>
                                </section>
                            </section>

                            <button className={`authButton ${irishGrover.className}`} type="submit">
                                <span className="authButton__text"> Register </span>
                            </button>
                        </form>

                        <section id="login-link-section" className="input">
                            <Link id="login-link" href={URL_LOGIN_PAGE} className="form__field"> Have an account? Sign in </Link>
                        </section>
                    </section>
            }
        </>
    );
}