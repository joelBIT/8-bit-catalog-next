'use client';

import { ReactElement, useActionState, useState, useEffect } from "react";
import { arima } from "@/fonts/fonts";
import { update } from "@/actions/account";
import { User } from "@/types/types";
import { PasswordInput } from "../common/PasswordInput";

import "./EditAccountForm.css";

export function EditAccountForm({ user } : { user: User }): ReactElement<ReactElement> {
    const [ state, formAction ] = useActionState(update.bind(null, user.id), { message: '', success: false, firstName: "", lastName: ""});
    const [ showMessage, setShowMessage ] = useState(false);

    useEffect(() => {
        if (state?.message && !showMessage) {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }
    }, [state]);

    return (
        <section id="account-edit__card">
            <section id="accountCard" className={arima.className}>
                <h1 className="accountCard__title">Edit Information</h1>

                <form id="accountForm" action={formAction}>
                    <input 
                        id="firstName" 
                        name="firstName" 
                        type="text" 
                        placeholder="First Name" 
                        className={arima.className} 
                        defaultValue={state?.success ? state.firstName : user?.first_name} 
                    />

                    <input 
                        id="lastName" 
                        name="lastName" 
                        type="text" 
                        placeholder="Last Name" 
                        className={arima.className} 
                        defaultValue={state?.success ? state.lastName : user?.last_name} 
                    />

                    <PasswordInput id="password" placeholder="Password" />
                    <PasswordInput id="passwordRepeat" placeholder="Re-type Password" />

                    <button className="accountButton" type="submit">Save</button>
                </form>
            </section>
        
            { showMessage ? <section>
                <h2 className={state?.success ? "message-success message-fade" : "message-failure message-fade"}>
                    {state?.message}
                </h2>
            </section> : <></> }
        </section>
        
    );
}