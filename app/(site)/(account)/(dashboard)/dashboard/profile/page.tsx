import { ReactElement } from "react";
import { EditProfileForm } from "@/app/_components/account/forms";

import "./page.css";

export default function AccountProfilePage(): ReactElement {
    return (
        <main id="profilePage">
            <EditProfileForm />
        </main>
    );
}