'use client';

import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { AccountContext } from "@/app/_contexts";
import { User } from "@/app/_types/types";
import { arima, rancho } from "@/app/_fonts/fonts";
import { getUsers } from "@/app/_client/client";
import { AddUserModal, UserList } from "@/app/_components/common";
import { USER_ROLE_ADMIN } from "@/app/_utils/utils";

import "./page.css";

/**
 * Enables an admin to modify current members and add new members. All members are listed and an admin can reduce this list
 * by entering letters in the search input. The list is updated instantly and users matching the combination of letters are listed.
 */
export default function MembersPage(): ReactElement {
    const { user } = useContext(AccountContext);
    const [ members, setMembers ] = useState<User[]>([]);
    const [ result, setResult ] = useState<User[]>([]);
    const [ modal, setModal ] = useState<boolean>(false);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getAllMembers();
    }, [])

    async function getAllMembers(): Promise<void> {
        const users = await getUsers();
        setMembers(users);
        setResult(users);
    }

    // Updates the result list matching the input character sequence (using lowercase since system stores lowercase emails)
    function updateMemberList(): void {
        const characters = searchRef.current?.value as string;
        setResult(members.filter(member => member.email.includes(characters.toLowerCase())));
    }

    // When the modal is closed the list of all members is updated (in case new members were added)
    function close(): void {
        setModal(false);
        getAllMembers();
    }

    return (
        <main id="membersPage">
            <h1 className="title">
                Members {
                members?.length > 0 ?
                    <p id="members-count" className={`material-symbols-outlined ${rancho.className}`}>
                        {members?.length}
                    </p> : <></>
                }
            </h1>

            <section id="heading">
                <search className="search-members">
                    <span className="material-symbols-outlined"> search </span>
                    <input
                        id="searchMember"
                        className={`${arima.className}`} 
                        type="text" 
                        placeholder="Search by email" 
                        ref={searchRef} 
                        onChange={updateMemberList} 
                    />
                </search>

                {
                    user?.role === USER_ROLE_ADMIN ?
                        <button className="button__link add-member__button" onClick={() => setModal(true)}> + Add member </button>
                        : <></>
                }

            </section>

            { modal ? <AddUserModal close={close} /> : <></> }

            <UserList users={result} />
        </main>
    );
}