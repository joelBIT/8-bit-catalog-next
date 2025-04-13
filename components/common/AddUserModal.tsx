'use client';

import { ReactElement, useRef } from "react";
import { arima } from "@/fonts/fonts";
import { User } from "@/types/types";

import "./AddUserModal.css";

export function AddUserModal({ confirm, open, close }: { confirm: (user: User) => void, open: boolean, close: (toggle: boolean) => void }): ReactElement {
    const modalRef = useRef<HTMLDialogElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    if (open) {
        modalRef.current?.showModal();
    } else {
        modalRef.current?.close();
    }
    
    function closeModal() {
        modalRef.current?.close();
        close(true);
    }

    function confirmAdd() {
        const user: User = {
            email: (emailRef.current?.value) as string,
            id: 0,
            last_name: (lastNameRef.current?.value) as string,
            first_name: (firstNameRef.current?.value) as string,
            password_hash: "",
            role: "regular",
            image: "",
            bio: ""
        }
        
        confirm(user);
    }

    return (
        <dialog id="addUserModal" ref={modalRef}>
            <form method="dialog">
                <h1 className="modal__text"> Add member </h1>

                <input 
                    id="member-email" 
                    className={arima.className} 
                    type="text" 
                    ref={emailRef} 
                    placeholder="Email" 
                />

                <input 
                    id="member-firstName" 
                    className={arima.className} 
                    type="text" 
                    ref={firstNameRef} 
                    placeholder="First name" 
                />

                <input 
                    id="member-lastName" 
                    className={arima.className} 
                    type="text" 
                    ref={lastNameRef} 
                    placeholder="Last name" 
                />
                
                <div className="modal-buttons-wrapper">
                    <button type="reset" onClick={closeModal} className={`gameButton ${arima.className}`}> Close </button>
                    <button type="reset" onClick={confirmAdd} className={`gameButton ${arima.className}`}> Confirm </button>
                </div>
            </form>
        </dialog>
    );
}