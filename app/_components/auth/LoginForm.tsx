'use client';

import { ReactElement, useRef, useActionState } from "react";
import { arima, irishGrover } from "@/app/_fonts/fonts";
import { login } from "@/app/_actions/auth";
import { PasswordInput } from "../common";

import "./LoginForm.css";

export function LoginForm(): ReactElement {
    const [ state, formAction ] = useActionState(login, { message: '', success: false });
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
                            placeholder="Email"
                            className={`${arima.className} form__field`}
                            autoComplete="off" 
                            required 
                        />

                        <span className="form__field-label">
                            Email
                        </span>
                    </section>

                    <PasswordInput id="password" placeholder="Password" />
                </section>
                
                <button className={`authButton ${irishGrover.className}`} type="submit">
                    <span className="authButton__text"> Login </span>
                </button>
            </form>
        </section>
    );
}