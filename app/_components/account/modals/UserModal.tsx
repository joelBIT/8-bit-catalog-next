'use client';

import {ReactElement, useEffect, useRef, useState} from "react";
import {Profile} from "@/app/_types/types";
import { Address } from "@/app/_db/schema/addresses";
import { getAddressByUserIdRequest, getProfileByUserIdRequest } from "@/app/_client/client";

import "./UserModal.css";

/**
 * Modal showing metadata about the supplied user.
 */
export function UserModal({ user_id, close }: { user_id: number, close: () => void }): ReactElement {
    const [profile, setProfile] = useState<Profile>();
    const [address, setAddress] = useState<Address>();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE + `${user_id}/`;

    useEffect(() => {
        getUserInformation();
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    async function getUserInformation(): Promise<void> {
        try {
            const profile = await getProfileByUserIdRequest(user_id);
            setProfile(profile);
            const address = await getAddressByUserIdRequest(user_id);
            setAddress(address);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <dialog id="userModal" ref={dialogRef}>
            <span onClick={close} className="closeButton" />

            <section id="user-information">
                <img src={STORAGE_URL + profile?.image} className="profile-image" alt="Profile image" />

                <section id="user-details">
                    <h1 id="user-name"> {profile?.firstName + " " + profile?.lastName} </h1>

                    <section id="user-address">
                        <h2> {address?.street} </h2>
                        <h2> {address?.city + ", " + address?.country} </h2>
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
                                Some game
                            </h1>
                            <h1>
                                Some other game
                            </h1>
                        </article>
                    </section>
                </div>

                <input type="radio" id="tabAbout" name="tabs" />
                <label htmlFor="tabAbout">About</label>
                <div className="tab">
                    <section>
                        <h3> {profile?.bio} </h3>
                    </section>
                </div>
            </section>
        </dialog>
    );
}