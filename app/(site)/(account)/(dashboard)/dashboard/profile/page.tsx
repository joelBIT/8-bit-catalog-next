import { ReactElement } from "react";
import { EditProfileImageForm } from "@/app/_components/account/forms";
import { getUser } from "@/app/_auth/server-functions";
import { getProfileByUserId } from "@/app/_db/profiles-db";

import "./page.css";

export default async function AccountProfilePage(): Promise<ReactElement> {

    return (
        <main id="profilePage">
            <EditProfileImageForm profile={await getProfileByUserId((await getUser()).id)} />
        </main>
    );
}