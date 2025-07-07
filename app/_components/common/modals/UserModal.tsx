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

                <section id="user-details">
                    <h1 id="user-name"> {user.first_name + " " + user.last_name} </h1>

                    <section id="user-address">
                        <h2> {user.address} </h2>
                        <h2> {user.city + ", " + user.country} </h2>
                    </section>

                    <button id="private-message" className="button__link">
                        Message
                    </button>
                </section>
            </section>

            <section id="user-pages">
                <input type="radio" id="tabFavourites" name="tabs" defaultChecked/>
                <label htmlFor="tabFavourites">Favourites</label>
                <div className="tab">
                    <section id="ingredientInformation">
                        <article id="favouritesList">
                            <h1>
                                Ett spel
                            </h1>
                            <h1>
                                Ett till spel
                            </h1>
                        </article>
                    </section>
                </div>

                <input type="radio" id="tabAbout" name="tabs" />
                <label htmlFor="tabAbout">About</label>
                <div className="tab">
                    <section>
                        <h3> {user.bio} </h3>
                    </section>
                </div>
            </section>
        </dialog>
    );
}