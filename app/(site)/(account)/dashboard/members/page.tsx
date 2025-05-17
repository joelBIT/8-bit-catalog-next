'use client';

import { ReactElement, useEffect, useRef, useState } from "react";
import { User } from "@/types/types";
import { arima } from "@/fonts/fonts";
import { getUsers } from "@/client/client";
import { AddUserModal, UserListEntry } from "@/app/_components/common";

import "./page.css";

/**
 * Enables an admin to modify current members and add new members. All members are listed and an admin can reduce this list
 * by entering letters in the search input. The list is updated instantly and users matching the combination of letters are listed.
 */
export default function MembersPage(): ReactElement {
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
            <section id="heading">
                <h1 className="title"> Members </h1>
                <h2 className="members-count__text"> All members ({members.length}) </h2>

                <search className="search-members">
                    <span className="material-symbols-outlined"> search </span>
                    <input 
                        className={`${arima.className}`} 
                        type="text" 
                        placeholder="Search by email" 
                        ref={searchRef} 
                        onChange={updateMemberList} 
                    />
                </search>
                    
                <button className="gameButton add-member__button" onClick={() => setModal(true)}> + Add member </button>
            </section>

            <AddUserModal open={modal} close={close} />

            <section id="members-list">
                <section className="members-list__heading">
                    <h2 className="members-list__heading-name"> Name </h2>
                    <h2> Role </h2>
                    <h2> Account </h2>
                    <h2 className="members-list__heading-joined"> Joined </h2>
                </section>

                { result.map(member => <UserListEntry user={member} active={true} key={member.email} />) }
            </section>
        </main>
    );
}