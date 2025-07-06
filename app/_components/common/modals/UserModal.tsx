import {ReactElement} from "react";
import {User} from "@/app/_types/types";

import "./UserModal.css";

export function UserModal({ user, close }: { user: User, close: () => void }): ReactElement {
    return (
        <dialog id="userModal">

        </dialog>
    );
}