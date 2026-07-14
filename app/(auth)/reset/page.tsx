'use client';

import { ReactElement, useState, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { authClient } from "@/app/auth-client";

import "./page.css";

/**
 * Change an account password that has been reset. The old password is the password sent to the supplied email address when
 * performing a reset of an account password.
 */
export default function ResetPasswordPage(): ReactElement {
    const [isVisible, setVisible] = useState<boolean>(false);
    const [isVisibleRepeat, setVisibleRepeat] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    if (!token) {
        return (
            <main id="resetPasswordPage">
                <h1 className="no-token__text"> No token found </h1>
            </main>
        );
    }

    async function resetPassword() {
        if (!token) {
            return;
        }

        const { data, error } = await authClient.resetPassword({
            newPassword,
            token
        });

        if (error) {
            setSuccess(false);
            setMessage("Could not update password");
        } else {
            setSuccess(true);
            setMessage("Password updated");
        }

        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
            setMessage('');
        }, 5000);
    }

    let messageContent = <></>;

    if (showMessage) {
        messageContent =
            <>
                <h2 className={success ? "message-success message-fade" : "message-failure message-fade"}>
                    {message}
                </h2>
            </>
    }

    return (
        <main id="resetPasswordPage">
            <Suspense>
                <form id="resetPasswordForm" action={resetPassword}>               
                    <h1 className="resetPasswordForm__title"> Change Password </h1>
                    <section id="password-inputs">
        
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
                                value={newPassword}
                                onChange={event => setNewPassword(event.target.value)}
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
                                value={confirmNewPassword}
                                onChange={event => setConfirmNewPassword(event.target.value)}
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
        
                    <button className="authButton" type="submit" disabled={!token || confirmNewPassword !== newPassword || newPassword.length < 8}>
                        <span className="authButton__text"> Update </span>
                    </button>
        
                    {messageContent}
                </form>
            </Suspense>
        </main>
    );
}