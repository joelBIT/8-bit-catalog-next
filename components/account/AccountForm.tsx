'use client';

import { ReactElement, useRef, useActionState } from "react";
import { arima } from "@/fonts/fonts";
import { update } from "@/actions/account";
import { User } from "@/types/types";
import { PasswordInput } from "../common/PasswordInput";

import "./AccountForm.css";

export function AccountForm({ user } : { user: User }): ReactElement<ReactElement> {
    const [ state, formAction ] = useActionState(update.bind(null, user.id), { message: '', success: false, firstName: "", lastName: ""});
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <section id="accountCard" className={arima.className}>
            <h1 className="accountCard__title">Edit Account</h1>

            { state?.message ? <h2 className={state?.success ? "message-success" : "message-failure"}>
                {state?.message}
            </h2> : <></> }

            <form id="accountForm" ref={formRef} action={formAction}>
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
    );
}