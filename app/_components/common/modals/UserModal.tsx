'use client';

import {ReactElement, useEffect, useRef} from "react";
import {User} from "@/app/_types/types";

import "./UserModal.css";

/**
 * Modal showing metadata about the supplied user.
 */
export function UserModal({ user, close }: { user: User, close: () => void }): ReactElement {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    return (
        <dialog id="userModal" ref={dialogRef}>
            { user.id }
            <span onClick={close} className="closeButton" />
        </dialog>
    );
}