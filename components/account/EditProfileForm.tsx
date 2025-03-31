'use client';

import { ReactElement, useActionState } from "react";
import { User } from "@/types/types";
import { DEFAULT_PROFILE_IMAGE, imageTypes } from "@/utils/utils";
import { updateProfile } from "@/actions/account";

import "./EditProfileForm.css";

export function EditProfileForm({ user } : { user: User }): ReactElement {
    const [ state, formAction ] = useActionState(updateProfile.bind(null, user.id), { message: '', success: false, bio: '', image: '' });
    const folder = user.image === DEFAULT_PROFILE_IMAGE ? "" : `${user.id}/`;       // default image located in root folder
    const STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE + folder;

    return (
        <form id="editProfileForm" action={formAction}>
            <section className="edit-profile-image">
                <img src={state.image ? STORAGE_URL + state.image : STORAGE_URL + user.image} className="profile-image" />
                <h2 className="edit-profile__change-image"> Change profile image <input name="profileImage" type="file" accept={imageTypes.toString()} />  </h2>
            </section>

            <article className="edit-profile__information">
                <h1 className="edit-profile__role"> Role: { user.role } </h1>
                <h2 className="edit-profile__email"> Email: { user.email } </h2>
                <textarea name="bio" className="edit-profile__bio" defaultValue={state.bio ? state.bio : user.bio} placeholder="About me" />
            </article>

            <button className="accountButton" type="submit"> Save </button>
        </form>
    );
}