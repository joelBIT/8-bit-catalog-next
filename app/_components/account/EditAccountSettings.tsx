'use client';

import { ReactElement, useActionState, useContext, useEffect, useState } from "react";
import { AccountContext } from "@/app/_contexts/AccountContextProvider";
import { updateAccountEmail, updateAccountUsername } from "@/app/_actions/account";
import { arima } from "@/app/_fonts/fonts";
import { EditPasswordForm } from ".";

import "./EditAccountSettings.css";

/**
 * Form for updating password. Messages are only visible for a specific amount of time.
 */
export function EditAccountSettings(): ReactElement {
    const { user } = useContext(AccountContext);
    const [ emailState, emailAction ] = useActionState(updateAccountEmail.bind(null, user.id), { message: '', success: false, email: user?.email });
    const [ usernameState, usernameAction ] = useActionState(updateAccountUsername.bind(null, user.id), { message: '', success: false, username: user?.username });
    const [ showEmailMessage, setShowEmailMessage ] = useState<boolean>(false);
    const [ showUsernameMessage, setShowUsernameMessage ] = useState<boolean>(false);

    useEffect(() => {
        if (emailState?.message && !showEmailMessage) {       // Show message for a fixed amount of time
            setShowEmailMessage(true);
            setTimeout(() => {
                setShowEmailMessage(false);
            }, 5000);
        }

        if (usernameState?.message && !showUsernameMessage) {       // Show message for a fixed amount of time
            setShowUsernameMessage(true);
            setTimeout(() => {
                setShowUsernameMessage(false);
            }, 5000);
        }
    }, [emailState, usernameState]);

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

                <form id="usernameForm" action={usernameAction}>
                    <h1 className="accountCard__title"> Change Username </h1>

                    <section className="input">
                        <input 
                            id="username"
                            name="username" 
                            type="text"
                            placeholder="SET USERNAME"
                            className={`${arima.className} form__field`}
                            defaultValue={usernameState?.username ? usernameState.username : user?.username} 
                            autoComplete="off" 
                            required 
                        />

                        <span className="form__field-label">
                            Username
                        </span>
                    </section>

                    <button className="authButton" type="submit">
                        <span className="authButton__text"> Update </span>
                    </button>
                </form>

                <EditPasswordForm />
            </section>

            { showEmailMessage ? 
                <h2 className={emailState?.success ? "message-success message-fade" : "message-failure message-fade"}>
                    {emailState?.message}
                </h2> : <></> 
            }

            { showUsernameMessage ? 
                <h2 className={usernameState?.success ? "message-success message-fade" : "message-failure message-fade"}>
                    {usernameState?.message}
                </h2> : <></> 
            }
        </>
    );
}