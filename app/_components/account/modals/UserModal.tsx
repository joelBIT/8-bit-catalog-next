'use client';

import {ReactElement, useEffect, useRef, useState} from "react";
import { Profile } from "@/app/_db/schema/profiles";
import { Address } from "@/app/_db/schema/addresses";
import { getAddressByUserIdRequest, getProfileByUserIdRequest } from "@/app/_client/client";
import { profileImageUrl } from "@/app/_utils/utils";

import "./UserModal.css";

/**
 * Modal showing metadata about the supplied user.
 */
export function UserModal({ userId, close }: { userId: string, close: () => void }): ReactElement {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [address, setAddress] = useState<Address | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE + `${userId}/`;

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    useEffect(() => {
        let cancelled = false;

        Promise.all([getProfileByUserIdRequest(userId), getAddressByUserIdRequest(userId)])
            .then(([loadedProfile, loadedAddress]) => {
                if (!cancelled) {
                    setProfile(loadedProfile ?? null);
                    setAddress(loadedAddress ?? null);
                }
            })
            .catch(console.log);

        return () => { cancelled = true; };
    }, [userId]);

    const fullName = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ');
    const cityLine = [address?.city, address?.country].filter(Boolean).join(', ');

    return (
        <dialog id="userModal" ref={dialogRef}>
            <span onClick={close} className="closeButton" />

            <section id="user-information">
                {
                    profile?.image && <img src={profileImageUrl(userId, profile.image)} className="profile-image" alt="Profile image" />
                }

                <section id="user-details">
                    <h1 id="user-name"> {fullName} </h1>

                    <section id="user-address">
                        <h2> {address?.street} </h2>
                        <h2> {cityLine} </h2>
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