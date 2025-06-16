'use client';

import { ReactElement, useActionState, useContext, useEffect, useState } from "react";
import { AccountContext } from "@/app/_contexts/AccountContextProvider";
import { updateAccountPassword } from "@/app/_actions/account";
import { arima } from "@/app/_fonts/fonts";

import "./EditAccountSettings.css";

/**
 * Form for updating password. Messages are only visible for a specific amount of time.
 */
export function EditAccountSettings(): ReactElement {
    const { user } = useContext(AccountContext);
    const [ state, formAction ] = useActionState(updateAccountPassword.bind(null, user.id), { message: '', success: false });
    const [ showMessage, setShowMessage ] = useState<boolean>(false);
    const [ isVisible, setVisible ] = useState<boolean>(false);
    const [ isVisibleRepeat, setVisibleRepeat ] = useState<boolean>(false);
    const [ isOldVisible, setOldVisible ] = useState<boolean>(false);

    useEffect(() => {
        if (state?.message && !showMessage) {       // Show message for a fixed amount of time
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }
    }, [state]);

    return (
        <>
            <section id="accountCard" className={arima.className}>
                <h1 className="accountCard__title">Change password</h1>

                <form id="passwordForm" action={formAction}>
                    <section id="password-inputs">
                        <section className="input">
                            <input 
                                id="oldPassword"
                                name="oldPassword"
                                type={isOldVisible ? "text" : "password"}
                                placeholder="OLD PASSWORD"
                                className={`${arima.className} form__field`}
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
                                className={`${arima.className} form__field`}
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
                                className={`${arima.className} form__field`}
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

                    <button className="button__link" type="submit"> Save </button>
                </form>
            </section>

            { showMessage ? 
                <h2 className={state?.success ? "message-success message-fade" : "message-failure message-fade"}>
                    {state?.message}
                </h2> : <></> 
            }
        </>
    );
}