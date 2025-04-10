'use client';

import { ReactElement, useRef } from "react";

import "./Modal.css";

export function Modal({ title, confirm, open, close }: { title: string, confirm: () => void, open: boolean, close: (toggle: boolean) => void }): ReactElement {
    const modalRef = useRef<HTMLDialogElement>(null);

    if (open) {
        modalRef.current?.showModal();
    }
    
    function closeModal() {
        modalRef.current?.close();
        close(true);
    }
    
    return (
        <dialog id="modal" ref={modalRef}>
            <form method="dialog">
                <h1 className="modal__text"> {title} </h1>
                <div className="modal-buttons-wrapper">
                    <button onClick={closeModal} className="gameButton"> Close </button>
                    <button onClick={confirm} className="gameButton"> Confirm </button>
                </div>
            </form>
        </dialog>
    );
}