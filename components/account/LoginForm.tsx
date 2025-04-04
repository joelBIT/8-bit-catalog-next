'use client';

import { ReactElement, useRef, useActionState, useEffect, useContext } from "react";
import Link from "next/link";
import { arima, irishGrover } from "@/fonts/fonts";
import { login } from "@/actions/auth";
import { URL_REGISTER_PAGE } from "@/utils/utils";
import { EmailInput } from "../common/EmailInput";
import { FavouritesContext } from "@/contexts/FavouritesContextProvider";
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
                <h1 className="loginCard__heading">Sign in</h1>
        
                <form id="loginForm" ref={formRef} action={formAction}>
                    <EmailInput />
                    <PasswordInput id="password" placeholder="Password" />
                    <span className="material-symbols-outlined"> lock </span>
                    
                    <button className={`authButton ${irishGrover.className}`} type="submit">
                        <span className="authButton__text"> Login </span>
                    </button>
                </form>

                <section id="register-link">
                    <h2 className="register-link__text">Need an account?</h2> 
                    <Link href={URL_REGISTER_PAGE} className="loginCard__create-account-link"> Register </Link>
                </section>
            </section>
        </section>
    );
}