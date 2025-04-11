'use client';

import { ReactElement, useRef, useActionState } from "react";
import Link from "next/link";
import { arima, irishGrover } from "@/fonts/fonts";
import { URL_LOGIN_PAGE } from "@/utils/utils";
import { register } from "@/actions/auth";
import { EmailInput, PasswordInput } from "../common";

import "./RegisterForm.css";

export function RegisterForm(): ReactElement<ReactElement> {
    const [state, formAction] = useActionState(register, { message: '', success: false });
    const formRef = useRef<HTMLFormElement>(null);

    if (formRef.current) {
        formRef.current?.reset();
    }

    return (
        <>
            { 
                state?.message ? 
                    <h2 className={state?.success ? "message-success" : "message-failure"}>
                        {state?.message}
                    </h2> : <></> 
            }

            { 
                state.success ?  
                    <p className="confirmation-text">A confirmation link will be sent to your email</p>  
                    :
                    <section id="registerCard" className={arima.className}>
                        <h1 className="registerCard__title">Create Account</h1>

                        <form id="registerForm" ref={formRef} action={formAction}>
                            <EmailInput />
                            <PasswordInput id="password" placeholder="Password" />
                            <PasswordInput id="passwordRepeat" placeholder="Re-type Password" />

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