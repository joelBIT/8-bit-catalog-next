'use client';

import { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@/app/_db/schema/auth/users";
import { Profile } from "@/app/_db/schema/profiles";
import { getMonthText } from "@/app/_utils/utils";
import { getProfileByUserIdRequest } from "@/app/_client/client";

import "./UserListEntry.css";

/**
 * Corresponds to an entry in a user list. The 'enrolled' parameter is the date when the user was registered.
 */
export function UserListEntry({ user, onSelect } : { user: User, onSelect: (user: User) => void }): ReactElement {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [profile, setProfile] = useState<Profile>();
    const STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE + `${user.id}/`;

    useEffect(() => {
        getProfile();
    }, [])

    async function getProfile(): Promise<void> {
        try {
            const profile = await getProfileByUserIdRequest(user.id);
            setProfile(profile);
        } catch (error) {
            console.log(error);
        }
    }

    function convertDate(date: Date): string {
        return `${getMonthText(date.getMonth())} ${date.getUTCDate()}, ${date.getFullYear()}`;
    }

    return (
        <li className="userListEntry" key={user.id}>
            <Image
                src={STORAGE_URL + profile?.image}
                unoptimized
                className="listEntry-figure__cover"
                onMouseEnter={() => setShowModal(true)}
                onMouseLeave={() => setShowModal(false)}
                onClick={() => onSelect(user)}
                alt="Member profile image"
                width={100}
                height={100}
            />

            <section className={showModal ? "image-modal-show" : "hidden"}>
                <Image
                    src={STORAGE_URL + profile?.image}
                    unoptimized
                    className="listEntry-figure__cover"
                    alt="Member profile image"
                    width={300}
                    height={300}
                />
            </section>

            <section className="userListEntry-information">
                <h2 className="user-email">
                    <section className="user-email__link" onClick={() => onSelect(user)}>
                        {user.email}
                    </section>
                </h2>

                <section className="userListEntry-details">
                    <article className="details-column">
                        <section className="details-section">
                            <h2 className="details__heading"> Name: </h2>
                            <h2 className="details__text"> {user.name} </h2>
                        </section>

                        <section className="details-section">
                            <h2 className="details__heading"> Role: </h2>
                            <h2 className="details__text"> {user.role} </h2>
                        </section>
                    </article>
                    
                    <article className="details-column">
                        <section className="details-section">
                            <h2 className="details__heading"> Account: </h2>
                            <h2 className="details__text"> {user.banned ? "Inactive" : "Active"} </h2>
                        </section>

                        <section className="details-section">
                            <h2 className="details__heading"> Enrolled: </h2>
                            <h2 className="details__text"> {convertDate(new Date(user.createdAt))} </h2>
                        </section>
                    </article>
                </section>
            </section>
        </li>
    );
}