'use client';

import { ReactElement} from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import { arima } from "@/fonts/fonts";
import { login } from "@/actions/actions";
import { URL_REGISTER_PAGE } from "@/utils/utils";
import { Input } from "../common/input/Input";

import "./LoginForm.css";

export function LoginForm(): ReactElement {
    const [state, formAction] = useFormState(login, null);

    return (
        <section id="loginCard" className={arima.className}>
            <h1 className="loginCard__heading">Log in</h1>
            {state?.message}
            
            <form id="loginForm" action={formAction}>
                <Input id="username" type="text" placeholder="Username" />
                <Input id="password" type="password" placeholder="Password" />
                
                <button className="accountButton" type="submit">Login</button>
            </form>
            <Link href={URL_REGISTER_PAGE} className="loginCard__create-account-link">Create an Account</Link>
        </section>
    );
}