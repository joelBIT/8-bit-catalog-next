'use client';

import { ReactElement, useRef, useActionState, useEffect, useContext } from "react";
import Link from "next/link";
import { arima, irishGrover } from "@/fonts/fonts";
import { login } from "@/actions/auth";
import { URL_REGISTER_PAGE } from "@/utils/utils";
import { FavouritesContext } from "@/contexts/FavouritesContextProvider";
import { EmailInput, PasswordInput } from "../common";

import "./LoginForm.css";

export function LoginForm(): ReactElement {
    const [ state, formAction ] = useActionState(login, { message: '', success: false });
    const formRef = useRef<HTMLFormElement>(null);
    const { loadFavouriteGames } = useContext(FavouritesContext);
    
    useEffect(() => {
        loadFavouriteGames();       // Updates the favourite list because users are redirected here when logging out
    }, []);

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

            <section id="loginCard" className={arima.className}>
                <h1 className="loginCard__title">Sign in</h1>
        
                <form id="loginForm" ref={formRef} action={formAction}>
                    <EmailInput />
                    <PasswordInput id="password" placeholder="Password" />
                    
                    <button className={`authButton ${irishGrover.className}`} type="submit">
                        <span className="authButton__text"> Login </span>
                    </button>
                </form>

                <section id="register-link">
                    <h2 className="register-link__text"> Need an account? </h2> 
                    <Link href={URL_REGISTER_PAGE} className="loginCard__create-account-link"> Register </Link>
                </section>
            </section>
        </>
    );
}