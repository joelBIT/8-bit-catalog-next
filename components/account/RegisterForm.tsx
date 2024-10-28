'use client';

import { ReactElement } from "react";
import { useFormState } from "react-dom";
import { UsernameInput } from "./input/UsernameInput";
import { EmailInput } from "./input/EmailInput";
import { PasswordInput } from "./input/PasswordInput";
import { PasswordRepeatInput } from "./input/PasswordRepeatInput";
import { register } from "@/data/user";
import styles from "./registerForm.module.css";
import { arima } from "@/fonts/fonts";

export function RegisterForm(): ReactElement {
    const [state, formAction] = useFormState(register, null);

    return (
        <section id={styles.registerCard} className={arima.className}>
            <h1 className={styles.h1}>Create Account</h1>
            {state?.message}

            <form id={styles.registerForm} action={formAction}>
                <UsernameInput />
                <EmailInput placeholder="Email" />
                <PasswordInput />
                <PasswordRepeatInput />

                <button className="accountButton" type="submit">Register</button>
            </form>
        </section>
    );
}