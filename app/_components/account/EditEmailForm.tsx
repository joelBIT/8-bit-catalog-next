'use client';

import { ReactElement, useActionState, useEffect, useState } from "react";
import { useAccount } from "@/app/_hooks";
import { updateAccountEmail } from "@/app/_actions/account";

import "./EditEmailForm.css";

export function EditEmailForm(): ReactElement {
    const { user } = useAccount();
    const [ state, formAction ] = useActionState(updateAccountEmail.bind(null, user.id), { message: '', success: false, email: user?.email });
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
        <form id="editEmailForm" action={formAction}>
            <h1 className="editEmailForm__title"> Change Email </h1>

            <section className="input">
                <input 
                    id="email"
                    name="email" 
                    type="email"
                    placeholder="SET EMAIL"
                    className="form__field"
                    defaultValue={state?.email ? state.email : user?.email} 
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

            { 
                showMessage ? 
                    <h2 className={state?.success ? "message-success message-fade" : "message-failure message-fade"}>
                        {state?.message}
                    </h2> : <></> 
            }
        </form>
    );
}