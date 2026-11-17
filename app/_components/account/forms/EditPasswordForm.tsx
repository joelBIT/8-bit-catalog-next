'use client';

import { ReactElement, useState } from "react";
import { authClient } from "@/app/auth-client";
import { ActionState } from "@/app/_types/types";
import { FlashMessage } from "../../common";

import "./EditPasswordForm.css";

export function EditPasswordForm(): ReactElement {
    const [isVisible, setVisible] = useState<boolean>(false);
    const [isVisibleRepeat, setVisibleRepeat] = useState<boolean>(false);
    const [isCurrentVisible, setCurrentVisible] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [feedback, setFeedback] = useState<ActionState>({ message: '', success: false });

    async function updatePassword() {
        if (newPassword !== confirmNewPassword) {
            setFeedback({ message: "New password must be the same as confirmed password.", success: false });
            return;
        }

        const { error } = await authClient.changePassword({
            newPassword,
            currentPassword,
            revokeOtherSessions: true
        });

        if (error) {
            setFeedback({ message: error.message ?? "Could not update password", success: false });
        } else {
            setFeedback({ message: "Password updated", success: true });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        }
    }

    return (
        <form id="editPasswordForm" action={updatePassword}>
            <h1 className="editPasswordForm__title"> Change Password </h1>

            <section id="password-inputs">
                <section className="input">
                    <input 
                        id="currentPassword"
                        name="currentPassword"
                        type={isCurrentVisible ? "text" : "password"}
                        placeholder="CURRENT PASSWORD"
                        className="form__field"
                        value={currentPassword}
                        onChange={event => setCurrentPassword(event.target.value)}
                        autoComplete="none" 
                        required 
                    />

                    <span className="form__field-label">
                        Current Password
                    </span>

                    <span className="material-symbols-outlined password-show" onClick={() => setCurrentVisible(!isCurrentVisible)}>
                        {isCurrentVisible ? "visibility_off" : "visibility"}
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

            <button className="authButton" type="submit">
                <span className="authButton__text"> Update </span>
            </button>

            <FlashMessage state={feedback} />
        </form>
    );
}