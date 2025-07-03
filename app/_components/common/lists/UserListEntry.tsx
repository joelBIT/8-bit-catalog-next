'use client';

import { ReactElement, useState } from "react";
import Image from "next/image";
import { User } from "@/app/_types/types";
import { getMonthText } from "@/app/_utils/utils";

import "./UserListEntry.css";

/**
 * Corresponds to an entry in a user list. The 'active' parameter is true is the user's account is activated, false otherwise.
 * The 'enrolled' parameter is the date when the user was registered.
 */
export function UserListEntry({ user, active } : { user: User, active: boolean }): ReactElement {
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE + `${user.id}/`;

    function convertDate(date: Date): string {
        return `${getMonthText(date.getMonth())} ${date.getUTCDate()}, ${date.getFullYear()}`;
    }

    return (
        <li className="userListEntry" key={user.id}>
            <Image
                src={STORAGE_URL + user?.image}
                unoptimized
                className="listEntry-figure__cover"
                onMouseEnter={() => setShowModal(true)}
                onMouseLeave={() => setShowModal(false)}
                alt="Member profile image"
                width={100}
                height={100}
            />

            <section className={showModal ? "image-modal-show" : "hidden"}>
                <Image
                    src={STORAGE_URL + user?.image}
                    unoptimized
                    className="listEntry-figure__cover"
                    alt="Member profile image"
                    width={300}
                    height={300}
                />
            </section>

            <h2 className="userCard-email">
                <section className="userCard-email__link">
                    {user.email}
                </section>
            </h2>

            <section className="name-section">
                <h2 className="userCard-name__heading"> Name </h2>
                <h2 className="userCard-name"> {`${user.first_name} ${user.last_name}`} </h2>
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
                <h2 className="userCard-enrolled"> {convertDate(new Date(user.created_at))} </h2>
            </section>
        </li>
    );
}