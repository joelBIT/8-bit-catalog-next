'use client';

import { ReactElement, useRef, useActionState, useEffect, useContext } from "react";
import Link from "next/link";
import { arima } from "@/fonts/fonts";
import { login } from "@/actions/auth";
import { URL_REGISTER_PAGE } from "@/utils/utils";
import { FavouritesContext } from "@/contexts/FavouritesContextProvider";
import { Input } from "../common/Input";
import { PasswordInput } from "../common/PasswordInput";

import "./LoginForm.css";

export function LoginForm(): ReactElement<ReactElement> {
    const [state, formAction] = useActionState(login, { message: '', success: false });
    const formRef = useRef<HTMLFormElement>(null);
    const { loadFavouriteGames } = useContext(FavouritesContext);
    
    useEffect(() => {
        loadFavouriteGames();       // Updates the favourite list because users are redirected here when logging out
    }, []);

    if (formRef.current) {
        formRef.current?.reset();
    }

    return (
        <section id="login">
            { state?.message ? 
                <h2 className={state?.success ? "message-success" : "message-failure"}>
                    {state?.message}
                </h2> : <></> 
            }

            <section id="loginCard" className={arima.className}>
                <h1 className="loginCard__heading">Log in</h1>
        
                <form id="loginForm" ref={formRef} action={formAction}>
                    <Input id="email" type="email" placeholder="Email" />
                    <PasswordInput id="password" placeholder="Password" />
                    
                    <button className="accountButton" type="submit">Login</button>
                </form>
                <Link href={URL_REGISTER_PAGE} className="loginCard__create-account-link"> Create an Account </Link>
            </section>
        </section>
    );
}