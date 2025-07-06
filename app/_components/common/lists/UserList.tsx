'use client';

import {ReactElement, useState} from "react";
import {useSearchParams} from "next/navigation";
import { User } from "@/app/_types/types";

import "./UserList.css";

export function UserList(): ReactElement {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const showModal = !!params.get('show');
    const [ openModal, setOpenModal ] = useState<boolean>(showModal);
    const [ selectedUser, setSelectedUser] = useState<User>({} as User);
    const HEADINGS = ["Name", "Email", "Role", "Account", "Joined"];

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

        </ul>
    );
}