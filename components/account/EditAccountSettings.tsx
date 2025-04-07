'use client';

import { ReactElement, useActionState, useContext, useEffect, useState } from "react";
import { AccountContext } from "@/contexts/AccountContextProvider";
import { updateAccountPassword } from "@/actions/account";
import { arima } from "@/fonts/fonts";
import { PasswordInput } from "../common";

import "./EditAccountSettings.css";

export function EditAccountSettings(): ReactElement {
    const { user } = useContext(AccountContext);
    const [ state, formAction ] = useActionState(updateAccountPassword.bind(null, user.id), { message: '', success: false });
    const [ showMessage, setShowMessage ] = useState<boolean>(false);

    useEffect(() => {
        if (state?.message && !showMessage) {       // Show message for a fixed amount of time
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }
    }, [state]);

    return (
        <section id="editAccountSettings">
            { showMessage ? 
                <section>
                    <h2 className={state?.success ? "message-success message-fade" : "message-failure message-fade"}>
                        {state?.message}
                    </h2>
                </section> : <></> 
            }

            <section id="accountCard" className={arima.className}>
                <h1 className="accountCard__title">Change password</h1>

                <form id="passwordForm" action={formAction}>
                    <PasswordInput id="oldPassword" placeholder="Old Password" />
                    <PasswordInput id="password" placeholder="New Password" />
                    <PasswordInput id="passwordRepeat" placeholder="Re-type New Password" />

                    <button className="gameButton" type="submit">Save</button>
                </form>
            </section>
        </section>
    );
}