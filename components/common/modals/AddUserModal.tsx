'use client';

import { ReactElement, useActionState, useRef } from "react";
import { EmailInput, PasswordInput } from "..";
import { arima } from "@/fonts/fonts";
import { createUserAndAccount } from "@/actions/account";

import "./AddUserModal.css";

/**
 * This modal is used by admin in admin pages when creating a new member. Creating a new account and user this way bypasses the email
 * verification process.
 */
export function AddUserModal({ open, close }: { open: boolean, close: () => void }): ReactElement {
    const [ state, formAction ] = useActionState(createUserAndAccount, { message: '', success: false });
    const modalRef = useRef<HTMLDialogElement>(null);

    if (open) {
        modalRef.current?.showModal();
    }
    
    function closeModal(): void {
        modalRef.current?.close();
        state.message = '';
        close();
    }

    return (
        <dialog id="addUserModal" ref={modalRef}>
            <form action={formAction}>
                <h1 className="modal__text"> Add member </h1>

                { state.message ? <h2 className={state.success ? "message-success" : "message-failure"}> {state.message} </h2> : <></> }

                <EmailInput />
                <PasswordInput id="password" placeholder="Password" />
                
                <div className="modal-buttons-wrapper">
                    <button type="reset" onClick={closeModal} className={`gameButton ${arima.className}`}> Close </button>
                    <button type="submit" className={`gameButton ${arima.className}`}> Confirm </button>
                </div>
            </form>
        </dialog>
    );
}