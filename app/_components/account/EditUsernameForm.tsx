'use client';

import { ReactElement, useActionState, useEffect, useState } from "react";
import { useAccount } from "@/app/_hooks";
import { updateAccountUsername } from "@/app/_actions/account";

import "./EditUsernameForm.css";

export function EditUsernameForm(): ReactElement {
    const { user } = useAccount();
    const [ state, formAction ] = useActionState(updateAccountUsername.bind(null, user.id), { message: '', success: false, username: user?.username });
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
        <form id="editUsernameForm" action={formAction}>
            <h1 className="editUsernameForm__title"> Change Username </h1>

            <section className="input">
                <input 
                    id="username"
                    name="username" 
                    type="text"
                    placeholder="SET USERNAME"
                    className="form__field"
                    defaultValue={state?.username ? state.username : user?.username} 
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

            { 
                showMessage ? 
                    <h2 className={state?.success ? "message-success message-fade" : "message-failure message-fade"}>
                        {state?.message}
                    </h2> : <></> 
            }
        </form>
    );
}