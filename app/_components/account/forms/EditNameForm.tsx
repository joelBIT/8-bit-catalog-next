'use client';

import { ReactElement, useActionState, useEffect, useState } from "react";
import { useAccount } from "@/app/_hooks";
import { updateName } from "@/app/_actions/user";

import "./EditNameForm.css";

export function EditNameForm(): ReactElement {
    const { user } = useAccount();
    const [state, formAction] = useActionState(updateName.bind(null, user.id), { message: '', success: false, name: user?.name });
    const [showMessage, setShowMessage] = useState<boolean>(false);
    
    useEffect(() => {
        if (state?.message && !showMessage) {       // Show message for a fixed amount of time
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }
    }, [state]);
    
    return (
        <form id="editUsernameForm" action={formAction}>
            <h1 className="editUsernameForm__title"> Change name </h1>

            <section className="input">
                <input 
                    id="name"
                    name="name" 
                    type="text"
                    placeholder="SET NAME"
                    className="form__field"
                    defaultValue={state?.name ?? ''} 
                    autoComplete="off" 
                    required 
                />

                <span className="form__field-label">
                    Name
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