'use client';

import { ReactElement, useRef } from "react";
import { arima } from "@/fonts/fonts";

import "./Modal.css";

export function Modal({ text, confirm, open, close }: { text: string, confirm: () => void, open: boolean, close: (toggle: boolean) => void }): ReactElement {
    const modalRef = useRef<HTMLDialogElement>(null);

    if (open) {
        modalRef.current?.showModal();
    } else {
        modalRef.current?.close();
    }
    
    function closeModal() {
        modalRef.current?.close();
        close(true);
    }
    
    return (
        <dialog id="modal" ref={modalRef}>
            <form method="dialog">
                <h1 className="modal__text"> {text} </h1>
                <div className="modal-buttons-wrapper">
                    <button onClick={closeModal} className={`gameButton ${arima.className}`}> Close </button>
                    <button onClick={confirm} className={`gameButton ${arima.className}`}> Confirm </button>
                </div>
            </form>
        </dialog>
    );
}