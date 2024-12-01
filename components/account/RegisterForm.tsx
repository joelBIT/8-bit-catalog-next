'use client';

import { ReactElement } from "react";
import { useFormState } from "react-dom";
import { arima } from "@/fonts/fonts";
import { register } from "@/actions/account";
import { Input } from "../common/input/Input";

import "./RegisterForm.css";

export function RegisterForm(): ReactElement {
    const [state, formAction] = useFormState(register, null);

    return (
        <section id="registerCard" className={arima.className}>
            <h1 className="registerCard__title">Create Account</h1>
            {state?.message}

            <form id="registerForm" action={formAction}>
                <Input id="email" type="email" placeholder="Email" />
                <Input id="name" type="text" placeholder="Name" />
                <Input id="password" type="password" placeholder="Password" />
                <Input id="passwordRepeat" type="password" placeholder="Re-type Password" />

                <button className="accountButton" type="submit">Register</button>
            </form>
        </section>
    );
}