'use client';

import { ReactElement, useRef, useState } from "react";
import { arima } from "@/app/_fonts/fonts";

import "./InputModal.css";

export function InputModal({ text, confirm, open, close }: { text: string, confirm: (value: string) => void, open: boolean, close: (toggle: boolean) => void }): ReactElement {
    const [ showMessage, setShowMessage ] = useState<boolean>();
    const modalRef = useRef<HTMLDialogElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    if (open) {
        modalRef.current?.showModal();
    }
    
    function closeModal() {
        modalRef.current?.close();
        setShowMessage(false);
        close(true);
    }

    function confirmAdd() {
        if (inputRef.current?.value && inputRef.current?.value.length > 2) {
            setShowMessage(false);
            confirm(inputRef.current?.value as string);
            closeModal();
        } else {
            setShowMessage(true);
        }
    }
    
    return (
        <dialog id="inputModal" ref={modalRef}>
            <form method="dialog">
                <h1 className="modal__text"> {text} </h1>
                
                { 
                    showMessage ? 
                        <h2 className="message-failure">
                            Value must be at least 3 characters
                        </h2> : <></> 
                }

                <input 
                    id="filterValueInput" 
                    className={arima.className} 
                    type="text" 
                    ref={inputRef} 
                    placeholder="Filter value" 
                />
                
                <div className="modal-buttons-wrapper">
                    <button type="reset" onClick={closeModal} className={`gameButton ${arima.className}`}> Close </button>
                    <button type="reset" onClick={confirmAdd} className={`gameButton ${arima.className}`}> Confirm </button>
                </div>
            </form>
        </dialog>
    );
}