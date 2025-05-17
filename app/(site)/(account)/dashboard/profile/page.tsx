import { ReactElement } from "react";
import { EditProfileForm } from "@/app/_components/account";

import "./page.css";

export default function AccountProfilePage(): ReactElement {
    return (
        <main id="profilePage">
            <EditProfileForm />
        </main>
    );
}