'use client';

import { ReactElement, useRef } from "react";
import { useFormState } from "react-dom";
import { arima } from "@/fonts/fonts";
import { register } from "@/actions/account";
import { Input } from "../common/input/Input";

import "./RegisterForm.css";

export function RegisterForm(): ReactElement {
    const [state, formAction] = useFormState(register, { message: '', success: false});
    const formRef = useRef<HTMLFormElement>(null);

    if (formRef.current) {
        formRef.current?.reset();
    }

    return (
        <section id="registerCard" className={arima.className}>
            <h1 className="registerCard__title">Create Account</h1>

            { state?.message ? <h2 className={state?.success ? "message-success" : "message-failure"}>
                {state?.message}
            </h2> : <></> }

            <form id="registerForm" ref={formRef} action={formAction}>
                <Input id="email" type="email" placeholder="Email" />
                <Input id="name" type="text" placeholder="Name" />
                <Input id="password" type="password" placeholder="Password" />
                <Input id="passwordRepeat" type="password" placeholder="Re-type Password" />

                { state.success ? <p className="confirmation-text">A confirmation link will be sent to your email</p> : <></> }
                <button className="accountButton" type="submit">Register</button>
            </form>
        </section>
    );
}