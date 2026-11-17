'use client';

import { ReactElement, useActionState } from "react";
import { fileTypes } from "@/app/_utils/utils";
import { updateProfileImage } from "@/app/_actions/profile";
import { Profile } from "@/app/_db/schema/profiles";
import { FlashMessage } from "../../common";

import "./EditProfileImageForm.css";

export function EditProfileImageForm({ profile }: { profile: Profile }): ReactElement {
    const [state, formAction] = useActionState(updateProfileImage, { message: '', success: false, image: profile.image });
    const STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE + `${profile.userId}/`;

    return (
        <form id="profileImageForm" action={formAction}>
            <section className="edit-profile-image">
                <img src={state.image ? STORAGE_URL + state.image : STORAGE_URL + profile.image} className="profile-image" alt="Profile image" />

                <section className="edit-profile__change-image"> 
                    <h1 className="edit-image__title"> Change profile image </h1> 
                    <input name="profileImage" className="edit-profile__input" type="file" accept={fileTypes.toString()} />
                </section>
            </section>

            <button className="authButton" > Update </button>

            <FlashMessage state={state} />
        </form>
    );
}