import { ReactElement } from "react";
import Image from "next/image";
import { User } from "@/app/_types/types";
import { getMonthText, USER_ROLE_ADMIN } from "@/app/_utils/utils";

import "./UserListEntry.css";

/**
 * Corresponds to an entry in a user list. The 'active' parameter is true is the user's account is activated, false otherwise.
 * The 'enrolled' parameter is the date when the user was registered.
 */
export function UserListEntry({ user, active } : { user: User, active: boolean }): ReactElement {
    const STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE + `${user.id}/`;

    function convertDate(date: Date): string {
        return `${getMonthText(date.getMonth())} ${date.getUTCDate()}, ${date.getFullYear()}`;
    }

    return (
        <section className="userListEntry">
            <section className="profile-info">
                <figure className="listEntry-figure">
                    <Image 
                        src={STORAGE_URL + user?.image}
                        unoptimized
                        className="listEntry-figure__cover"
                        alt="Member profile image"
                        width={100}
                        height={300}
                    />
                </figure>

                <section className="member-name">
                    <h2> {`${user.first_name} ${user.last_name}`} </h2>
                    <h2 className="member-name__email"> {user.email} </h2>
                </section>
            </section>

            <h2 className={user.role === USER_ROLE_ADMIN ? "admin-role" : ""}> {user.role} </h2>

            <h2 className={active ? "" : "account-inactive"}> {active ? "Active" : "Inactive"} </h2>

            <h2 className="enrollment-date"> {convertDate(new Date(user.created_at))} </h2>
        </section>
    );
}