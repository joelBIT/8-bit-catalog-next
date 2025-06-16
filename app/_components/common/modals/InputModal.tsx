'use client';

import { ReactElement, useEffect, useRef, useState } from "react";
import { arima } from "@/app/_fonts/fonts";

import "./InputModal.css";

export function InputModal({ text, confirm, close }: { text: string, confirm: (value: string) => void, close: (toggle: boolean) => void }): ReactElement {
    const [ showMessage, setShowMessage ] = useState<boolean>();
    const modalRef = useRef<HTMLDialogElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!modalRef.current?.open) {
            modalRef.current?.showModal();
        }
    }, [])
    
    function closeModal(): void {
        modalRef.current?.close();
        setShowMessage(false);
        close(true);
    }

    function confirmAdd(): void {
        if (inputRef.current?.value && inputRef.current?.value.length > 2) {
            setShowMessage(false);
            confirm(inputRef.current?.value as string);
            closeModal();
        } else {
            setShowMessage(true);
        }
    }
    
    return (
        <dialog id="inputModal" ref={modalRef} className="modal-dialog">
            <form method="dialog" className="modal-content">
                <h1 className="modal__text"> {text} </h1>
                
                { 
                    showMessage ? 
                        <h2 className="message-failure">
                            Value must be at least 3 characters
                        </h2> : <></> 
                }

                <input 
                    id="filterValueInput" 
                    className={`${arima.className} input-field`}
                    type="text" 
                    ref={inputRef} 
                    placeholder="Filter value" 
                />
                
                <span onClick={closeModal} className="closeButton" />
                <button type="reset" onClick={confirmAdd} className="button__link"> Confirm </button>
            </form>
        </dialog>
    );
}