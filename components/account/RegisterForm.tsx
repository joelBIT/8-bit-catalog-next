'use client';

import { ReactElement } from "react";
import { useFormState } from "react-dom";
import { UsernameInput } from "./input/UsernameInput";
import { EmailInput } from "./input/EmailInput";
import { PasswordInput } from "./input/PasswordInput";
import { PasswordRepeatInput } from "./input/PasswordRepeatInput";
import { arima } from "@/fonts/fonts";
import { register } from "@/actions/actions";

import "./RegisterForm.css";

export function RegisterForm(): ReactElement {
    const [state, formAction] = useFormState(register, null);

    return (
        <section id="registerCard" className={arima.className}>
            <h1 className="registerCard__title">Create Account</h1>
            {state?.message}

            <form id="registerForm" action={formAction}>
                <UsernameInput />
                <EmailInput placeholder="Email" />
                <PasswordInput />
                <PasswordRepeatInput />

                <button className="accountButton" type="submit">Register</button>
            </form>
        </section>
    );
}