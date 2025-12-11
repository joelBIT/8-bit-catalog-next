'use client';

import { ReactElement, useEffect, useRef, useState } from "react";

import "./EditFilterModal.css";

export function EditFilterModal({ filterValue, confirm, close }: { filterValue: string, confirm: (value: string) => void, close: (toggle: boolean) => void }): ReactElement {
    const [showMessage, setShowMessage] = useState<boolean>();
    const [value, setValue] = useState<string>(filterValue);
    const modalRef = useRef<HTMLDialogElement>(null);

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
        if (value.length > 2) {
            setShowMessage(false);
            confirm(value);
            closeModal();
        } else {
            setShowMessage(true);
        }
    }
    
    return (
        <dialog id="inputModal" ref={modalRef} className="modal-dialog">
            <form method="dialog" className="modal-content">
                <h1 className="modal__text"> Update filter value </h1>
                
                { 
                    showMessage ? 
                        <h2 className="message-failure">
                            Value must be at least 3 characters
                        </h2> : <></> 
                }

                <input 
                    id="filterValueInput" 
                    className="input-field"
                    type="text" 
                    required
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Filter value" 
                />
                
                <span onClick={closeModal} className="closeButton" />
                <button type="reset" onClick={confirmAdd} className="button__link"> Update </button>
            </form>
        </dialog>
    );
}