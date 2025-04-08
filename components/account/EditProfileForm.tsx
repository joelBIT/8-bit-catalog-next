'use client';

import { ReactElement, useActionState, useContext } from "react";
import { imageTypes } from "@/utils/utils";
import { updateProfile } from "@/actions/account";
import { AccountContext } from "@/contexts/AccountContextProvider";

import "./EditProfileForm.css";

export function EditProfileForm(): ReactElement {
    const { user } = useContext(AccountContext);
    const [ state, formAction ] = useActionState(updateProfile.bind(null, user.id), { message: '', success: false, image: user?.image });
    const STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE + `${user.id}/`;

    return (
        <form id="editProfileForm" action={formAction}>
            <section className="edit-profile-image">
                <img src={state.image ? STORAGE_URL + state.image : STORAGE_URL + user?.image} className="profile-image" alt="Profile image" />
                <h2 className="edit-profile__change-image"> Change profile image <input name="profileImage" type="file" accept={imageTypes.toString()} />  </h2>
            </section>

            <article className="edit-profile__information">
                <h1 className="edit-profile__role"> Role: { user.role } </h1>
                <h2 className="edit-profile__email"> Email: { user.email } </h2>
            </article>

            <button className="gameButton" type="submit"> Save </button>
        </form>
    );
}