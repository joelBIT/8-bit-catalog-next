'use client';

import {ReactElement, useEffect, useRef} from "react";
import {User} from "@/app/_types/types";

import "./UserModal.css";

/**
 * Modal showing metadata about the supplied user.
 */
export function UserModal({ user, close }: { user: User, close: () => void }): ReactElement {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE + `${user.id}/`;

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    return (
        <dialog id="userModal" ref={dialogRef}>
            <span onClick={close} className="closeButton" />

            <section id="user-information">
                <img src={STORAGE_URL + user?.image} className="profile-image" alt="Profile image" />
            </section>

            <section id="info-links">
                <h2> Favourites </h2>
                <h2> About </h2>
            </section>

            <section id="link-page">

            </section>
        </dialog>
    );
}