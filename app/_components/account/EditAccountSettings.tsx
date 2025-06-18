'use client';

import { ReactElement, useActionState, useContext, useEffect, useState } from "react";
import { AccountContext } from "@/app/_contexts/AccountContextProvider";
import { updateAccountEmail } from "@/app/_actions/account";
import { arima } from "@/app/_fonts/fonts";
import { EditPasswordForm, EditUsernameForm } from ".";

import "./EditAccountSettings.css";

/**
 * Form for updating password. Messages are only visible for a specific amount of time.
 */
export function EditAccountSettings(): ReactElement {
    const { user } = useContext(AccountContext);
    const [ emailState, emailAction ] = useActionState(updateAccountEmail.bind(null, user.id), { message: '', success: false, email: user?.email });
    const [ showEmailMessage, setShowEmailMessage ] = useState<boolean>(false);

    useEffect(() => {
        if (emailState?.message && !showEmailMessage) {       // Show message for a fixed amount of time
            setShowEmailMessage(true);
            setTimeout(() => {
                setShowEmailMessage(false);
            }, 5000);
        }
    }, [emailState]);

    return (
        <>
            <section id="accountCard" className={arima.className}>
                <form id="emailForm" action={emailAction}>
                    <h1 className="accountCard__title"> Change Email </h1>

                    <section className="input">
                        <input 
                            id="email"
                            name="email" 
                            type="email"
                            placeholder="SET EMAIL"
                            className={`${arima.className} form__field`}
                            defaultValue={emailState?.email ? emailState.email : user?.email} 
                            autoComplete="off" 
                            required 
                        />

                        <span className="form__field-label">
                            Email
                        </span>
                    </section>

                    <button className="authButton" type="submit">
                        <span className="authButton__text"> Update </span>
                    </button>
                </form>

            
                <EditUsernameForm />
                <EditPasswordForm />
            </section>

            { showEmailMessage ? 
                <h2 className={emailState?.success ? "message-success message-fade" : "message-failure message-fade"}>
                    {emailState?.message}
                </h2> : <></> 
            }
        </>
    );
}