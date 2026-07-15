'use client';

import {ReactElement, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import { User } from "@/app/_db/schema/auth/users";
import { UserModal } from "../modals";
import { UserListEntry } from ".";

import "./UserList.css";

export function UserList({ users }: { users: User[] }): ReactElement {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const showModal = !!params.get('show');
    const [openModal, setOpenModal] = useState<boolean>(showModal);
    const [selectedUser, setSelectedUser] = useState<User>({} as User);
    const [currentUsers, setCurrentUsers] = useState<User[]>([]);

    useEffect(() => {
        setCurrentUsers(users);
        setOpenModal(showModal);        // Close modal if navigating back from modal to page
    })

    function openUserModal(user: User): void {
        closeUserModal();       // Handles when back button on mobile phone is used, makes sure the url is really updated before opening modal

        setTimeout(() => {
            params.set('show', "true");
            window.history.pushState(null, '', `?${params.toString()}`);
            setSelectedUser(user);
            setOpenModal(true);
        }, 300);
    }

    function closeUserModal(): void {
        params.delete('show');
        window.history.pushState(null, '', `?${params.toString()}`);
        setSelectedUser({} as User);
        setOpenModal(false);
    }

    return (
        <ul id="userList">
            { openModal && Object.keys(selectedUser).length > 0 ? <UserModal userId={selectedUser.id} close={() => closeUserModal()} /> : <></> }

            { currentUsers.length > 0 ? currentUsers.map(user => <UserListEntry user={user} key={user.id} onSelect={openUserModal} />) : <></> }
        </ul>
    );
}