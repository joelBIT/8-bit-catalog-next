'use client';

import { ReactElement} from "react";
import { login } from "../../data/user";
import { URL_REGISTER_PAGE } from "@/utils/utils";
import { UsernameInput } from "./input/UsernameInput";
import { PasswordInput } from "./input/PasswordInput";
import Link from "next/link";
import { useFormState } from "react-dom";
import styles from "./loginForm.module.css";
import { arima } from "@/fonts/fonts";

export function LoginForm(): ReactElement {
    const [state, formAction] = useFormState(login, null);

    return (
        <section id={styles.loginCard} className={arima.className}>
            <h1 className={styles.h1}>Log in</h1>
            
            <form id={styles.loginForm} action={formAction}>
                <UsernameInput />
                <PasswordInput />
                
                <button className="accountButton" type="submit">Login</button>
            </form>
            <Link href={URL_REGISTER_PAGE} className={styles.link}>Create an Account</Link>
        </section>
    );
}