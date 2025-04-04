'use client';

import { ReactElement, useRef, useActionState } from "react";
import { arima, irishGrover } from "@/fonts/fonts";
import { register } from "@/actions/auth";
import { Input } from "../common/Input";
import { PasswordInput } from "../common/PasswordInput";

import "./RegisterForm.css";
import { URL_LOGIN_PAGE } from "@/utils/utils";
import Link from "next/link";

export function RegisterForm(): ReactElement<ReactElement> {
    const [state, formAction] = useActionState(register, { message: '', success: false });
    const formRef = useRef<HTMLFormElement>(null);

    if (formRef.current) {
        formRef.current?.reset();
    }

    return (
        <section id="register">
            { state?.message ? 
                <h2 className={state?.success ? "message-success" : "message-failure"}>
                    {state?.message}
                </h2> : <></> 
            }

            { state.success ?  
                <p className="confirmation-text">A confirmation link will be sent to your email</p>  
                    :
                <section id="registerCard" className={arima.className}>
                    <h1 className="registerCard__title">Create Account</h1>

                    <form id="registerForm" ref={formRef} action={formAction}>
                        <Input id="email" type="email" placeholder="Email" />
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
        </section>
    );
}