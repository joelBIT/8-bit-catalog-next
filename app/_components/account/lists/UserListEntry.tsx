'use client';

import { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import { Profile, User } from "@/app/_types/types";
import { getMonthText } from "@/app/_utils/utils";
import { getProfileByUserIdRequest } from "@/app/_client/client";

import "./UserListEntry.css";

/**
 * Corresponds to an entry in a user list. The 'active' parameter is true is the user's account is activated, false otherwise.
 * The 'enrolled' parameter is the date when the user was registered.
 */
export function UserListEntry({ user, active, click } : { user: User, active: boolean, click: (user: User) => void }): ReactElement {
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
                onClick={() => click(user)}
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

            <h2 className="userCard-email">
                <section className="userCard-email__link" onClick={() => click(user)}>
                    {user.email}
                </section>
            </h2>

            <section className="name-section">
                <h2 className="userCard-name__heading"> Name </h2>
                <h2 className="userCard-name"> {`${profile?.firstName} ${profile?.lastName}`} </h2>
            </section>

            <section className="role-section">
                <h2 className="userCard-role__heading"> Role </h2>
                <h2 className="userCard-role"> {user.role} </h2>
            </section>

            <section className="account-section">
                <h2 className="userCard-account__heading"> Account </h2>
                <h2 className="userCard-account"> {active ? "Active" : "Inactive"} </h2>
            </section>

            <section className="enrolled-section">
                <h2 className="userCard-enrolled__heading"> Enrolled </h2>
                <h2 className="userCard-enrolled"> {convertDate(new Date(user.createdAt))} </h2>
            </section>
        </li>
    );
}