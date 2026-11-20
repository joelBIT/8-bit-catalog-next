'use client';

import { ReactElement, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/app/_db/schema/auth/users";
import { AddUserModal } from "@/app/_components/account/modals";
import { UserList } from "@/app/_components/account/lists";

export function MembersView({ users }: { users: User[] }): ReactElement {
    const [query, setQuery] = useState('');
    const [modal, setModal] = useState(false);
    const router = useRouter();

    const normalized = query.trim().toLowerCase();
    const result = normalized ? users.filter(user => user.email.toLowerCase().includes(normalized)) : users;

    function close(): void {
        setModal(false);
        router.refresh();               // reloads the server data, so new members appear
    }

    return (
        <main id="membersPage">
            <h1 className="title">
                Members
                {users.length > 0 && <p id="members-count" className="material-symbols-outlined">{users.length}</p>}
            </h1>

            <section id="memberSearch">
                <search className="search-members">
                    <span className="material-symbols-outlined"> search </span>
                    <input
                        id="searchMember"
                        type="text"
                        placeholder="Search by email"
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                    />
                </search>

                <button className="button__link add-member__button" onClick={() => setModal(true)}> + Add member </button>
            </section>

            {modal && <AddUserModal close={close} />}

            <UserList users={result} />
        </main>
    );
}