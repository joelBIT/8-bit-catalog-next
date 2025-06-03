'use client';

import { ReactElement, useRef, useActionState } from "react";
import Link from "next/link";
import { arima, irishGrover } from "@/app/_fonts/fonts";
import { URL_LOGIN_PAGE } from "@/app/_utils/utils";
import { register } from "@/app/_actions/auth";
import { UsernameInput, PasswordInput } from "../common";

import "./RegisterForm.css";

export function RegisterForm(): ReactElement {
    const [state, formAction] = useActionState(register, { message: '', success: false });
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
                        <h1 className="registerCard__title">Create Account</h1>

                        { 
                            state?.message ? 
                                <h2 className={state?.success ? "message-success" : "message-failure"}>
                                    {state?.message}
                                </h2> : <></> 
                        }

                        <form id="registerForm" ref={formRef} action={formAction}>
                            <section id="register-input">
                                <UsernameInput />
                                {/* <EmailInput /> */}
                                <PasswordInput id="password" placeholder="Password" />
                                <PasswordInput id="passwordRepeat" placeholder="Re-type Password" />
                            </section>

                            <button className={`authButton ${irishGrover.className}`} type="submit">
                                <span className="authButton__text"> Register </span>
                            </button>
                        </form>

                        <section id="login-link">
                            <h2 className="login-link__text">Already got an account?</h2> 
                            <Link href={URL_LOGIN_PAGE} className="registerCard__login-link"> Sign in </Link>
                        </section>
                    </section>
            }
        </>
    );
}