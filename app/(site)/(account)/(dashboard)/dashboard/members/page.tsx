import { ReactElement } from "react";
import { requireAdmin } from "@/app/_auth/server-functions";
import { getAllUsers } from "@/app/_db/users-db";
import { MembersView } from "@/app/_components/account/MembersView";

import "./page.css";

/**
 * Enables an admin to modify current members and add new members. All members are listed and an admin can reduce this list
 * by entering letters in the search input. The list is updated instantly and users matching the combination of letters are listed.
 */
export default async function MembersPage(): Promise<ReactElement> {
    await requireAdmin();
    return <MembersView users={await getAllUsers()} />;
}