'use client';

import { ReactElement, useActionState, useEffect, useRef, useState } from "react";
import { arima } from "@/app/_fonts/fonts";
import { createUserAndAccount } from "@/app/_actions/account";

import "./AddUserModal.css";

/**
 * This modal is used by admin in admin pages when creating a new member. Creating a new account and user this way bypasses the email
 * verification process.
 */
export function AddUserModal({ close }: { close: () => void }): ReactElement {
    const [ state, formAction ] = useActionState(createUserAndAccount, { message: '', success: false });
    const [ isVisible, setVisible ] = useState<boolean>(false);
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!modalRef.current?.open) {
            modalRef.current?.showModal();
        }
    }, [])
    
    function closeModal(): void {
        modalRef.current?.close();
        state.message = '';
        close();
    }

    return (
        <dialog id="addUserModal" ref={modalRef} className="modal-dialog">
            <form action={formAction} className="modal-content">
                <h1 className="modal__text"> Add member </h1>

                { state.message ? <h2 className={state.success ? "message-success" : "message-failure"}> {state.message} </h2> : <></> }

                <section className="input">
                    <input 
                        id="email"
                        name="email" 
                        type="email"
                        placeholder="SET EMAIL"
                        className={`${arima.className} form__field`}
                        autoComplete="off" 
                        required 
                    />

                    <span className="form__field-label">
                        Email
                    </span>
                </section>

                <section className="input">
                    <input 
                        id="password"
                        name="password"
                        type={isVisible ? "text" : "password"}
                        placeholder="SET PASSWORD"
                        className={`${arima.className} form__field`}
                        autoComplete="none" 
                        required 
                    />

                    <span className="form__field-label">
                        Password
                    </span>

                    <span className="material-symbols-outlined password-show" onClick={() => setVisible(!isVisible)}>
                        {isVisible ? "visibility_off" : "visibility"}
                    </span>
                </section>
                
                <span onClick={closeModal} className="closeButton" />
                <button type="submit" className="button__link"> Confirm </button>
            </form>
        </dialog>
    );
}