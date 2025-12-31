'use client';

import { ReactElement, useActionState, useEffect, useState, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { changeAccountPassword } from "@/app/_actions/password";
import { URL_LOGIN_PAGE } from "@/app/_utils/utils";

import "./page.css";

/**
 * Form for changing an account password that has been reset. The old password is the password sent to the supplied email address when
 * performing a reset of an account password.
 */
export default function ResetPasswordPage(): ReactElement {
    const [state, formAction] = useActionState(changeAccountPassword, { message: '', success: false });
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

    function PasswordForm(): ReactElement {
        const searchParams = useSearchParams();
        const email = searchParams.get('email') as string;

        return (
            <form id="resetPasswordForm" action={formAction}>
                <input type="hidden" name="email" value={email ? email : ""} />
                { !email ? <h2 className="message-failure email-parameter"> Email parameter is missing </h2> : <></> }
                
                <h1 className="resetPasswordForm__title"> Change Password </h1>
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
                    state.success ? 
                        <section id="login-link-section" className="input">
                            <Link id="login-link" href={URL_LOGIN_PAGE} className="form__field"> Sign in </Link>
                        </section>
                        : <></> 
                }
    
                { 
                    showMessage ? 
                        <h2 className={state?.success ? "message-success message-fade" : "message-failure message-fade"}>
                            {state?.message}
                        </h2> : <></> 
                }
            </form>
        );
    }

    return (
        <main id="resetPasswordPage">
            <Suspense>
                <PasswordForm />
            </Suspense>
        </main>
    );
}