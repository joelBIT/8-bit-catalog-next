'use client';

import { ReactElement, useEffect, useRef } from "react";

import "./Modal.css";

export function Modal({ text, confirm, close }: { text: string, confirm: () => void, close: (toggle: boolean) => void }): ReactElement {
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!modalRef.current?.open) {
            modalRef.current?.showModal();
        }
    }, [])
    
    function closeModal(): void {
        modalRef.current?.close();
        close(true);
    }
    
    return (
        <dialog id="modal" ref={modalRef} className="modal-dialog">
            <form method="dialog" className="modal-content">
                <h1 className="modal__text"> {text} </h1>
                <span onClick={closeModal} className="closeButton" />
                <button onClick={confirm} className="button__link"> Confirm </button>
            </form>
        </dialog>
    );
}