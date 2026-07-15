import { ReactElement } from "react";
import { EditProfileImageForm } from "@/app/_components/account/forms";
import { Profile } from "@/app/_db/schema/profiles";

import "./page.css";

export default function AccountProfilePage(): ReactElement {
    const profile = {} as Profile;      //getProfile

    return (
        <main id="profilePage">
            <EditProfileImageForm profile={profile} />
        </main>
    );
}