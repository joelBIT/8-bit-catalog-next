'use client';

import { ReactElement, useActionState, useEffect, useState } from "react";
import { useAccount } from "@/app/_hooks";
import { updateAccountPassword } from "@/app/_actions/account";

import "./EditPasswordForm.css";

export function EditPasswordForm(): ReactElement {
    const { user } = useAccount();
    const [state, formAction] = useActionState(updateAccountPassword.bind(null, user.id), { message: '', success: false });
    const [isVisible, setVisible] = useState<boolean>(false);
    const [isVisibleRepeat, setVisibleRepeat] = useState<boolean>(false);
    const [isOldVisible, setOldVisible] = useState<boolean>(false);
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
        <form id="editPasswordForm" action={formAction}>
            <h1 className="editPasswordForm__title"> Change Password </h1>

            <section id="password-inputs">
                <section className="input">
                    <input 
                        id="oldPassword"
                        name="oldPassword"
                        type={isOldVisible ? "text" : "password"}
                        placeholder="OLD PASSWORD"
                        className="form__field"
                        autoComplete="none" 
                        required 
                    />

                    <span className="form__field-label">
                        Old Password
                    </span>

                    <span className="material-symbols-outlined password-show" onClick={() => setOldVisible(!isOldVisible)}>
                        {isOldVisible ? "visibility_off" : "visibility"}
                    </span>
                </section>

                <span id="password-requirements"> Passwords must </span>
                <ul id="requirements-list">
                    <li> be at least 8 characters long </li>
                    <li> contain at least 1 number </li>
                </ul>
                <section className="input">
                    <input 
                        id="password"
                        name="password"
                        type={isVisible ? "text" : "password"}
                        placeholder="SET NEW PASSWORD"
                        className="form__field"
                        autoComplete="none" 
                        required 
                    />

                    <span className="form__field-label">
                        New Password
                    </span>

                    <span className="material-symbols-outlined password-show" onClick={() => setVisible(!isVisible)}>
                        {isVisible ? "visibility_off" : "visibility"}
                    </span>
                </section>

                <section className="input">
                    <input 
                        id="passwordRepeat"
                        name="passwordRepeat"
                        type={isVisibleRepeat ? "text" : "password"}
                        placeholder="CONFIRM PASSWORD"
                        className="form__field"
                        autoComplete="none" 
                        required 
                    />

                    <span className="form__field-label">
                        Confirm New Password
                    </span>

                    <span className="material-symbols-outlined password-show" onClick={() => setVisibleRepeat(!isVisibleRepeat)}>
                        {isVisibleRepeat ? "visibility_off" : "visibility"}
                    </span>
                </section>
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