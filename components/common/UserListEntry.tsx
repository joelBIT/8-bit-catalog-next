import { ReactElement } from "react";
import Image from "next/image";
import { User } from "@/types/types";

import "./UserListEntry.css";

/**
 * Corresponds to an entry in a user list. The 'active' parameter is true is the user's account is activated, false otherwise.
 * The 'enrolled' parameter is the date when the user was registered.
 */
export function UserListEntry({ user, active, enrolled } : { user: User, active: boolean, enrolled: string }): ReactElement {
    const STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE + `${user.id}/`;

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

                <h2> {user.first_name} </h2>
                <h2> {user.last_name} </h2>
            </section>

            <h2> {user.role} </h2>

            <h2> {active ? "Active" : "Inactive"} </h2>

            <h2 className="enrollment-date"> {enrolled} </h2>
        </section>
    );
}