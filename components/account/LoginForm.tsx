'use client';

import { ReactElement, useRef, useActionState } from "react";
import Link from "next/link";
import { arima } from "@/fonts/fonts";
import { login } from "@/actions/account";
import { URL_REGISTER_PAGE } from "@/utils/utils";
import { Input } from "../common/Input";

import "./LoginForm.css";

export function LoginForm(): ReactElement<ReactElement> {
    const [state, formAction] = useActionState(login, { message: '', success: false });
    const formRef = useRef<HTMLFormElement>(null);

    if (formRef.current) {
        formRef.current?.reset();
    }

    return (
        <section id="loginCard" className={arima.className}>
            <h1 className="loginCard__heading">Log in</h1>
            
            { state?.message ? <h2 className={state?.success ? "message-success" : "message-failure"}>
                {state?.message}
            </h2> : <></> }
            
            <form id="loginForm" ref={formRef} action={formAction}>
                <Input id="email" type="email" placeholder="Email" />
                <Input id="password" type="password" placeholder="Password" />
                
                <button className="accountButton" type="submit">Login</button>
            </form>
            <Link href={URL_REGISTER_PAGE} className="loginCard__create-account-link">Create an Account</Link>
        </section>
    );
}