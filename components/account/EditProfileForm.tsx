'use client';

import { ChangeEvent, ReactElement, useState } from "react";
import { User } from "@/types/types";
import { imageTypes } from "@/utils/utils";

import "./EditProfileForm.css";

export function EditProfileForm({ user } : { user: User }): ReactElement {
    const [ profileImage, setProfileImage ] = useState<File>();

    function handleImage(event: ChangeEvent<HTMLInputElement>): void {
        if (event.target.files) {
            setProfileImage(event.target.files[0]);
        }
    }

    return (
        <form id="editProfileForm">
            <section className="edit-profile-image">
                <img src={user.image} className="profile-image" />
                <h2 className="edit-profile__change-image"> Change profile image <input type="file" accept={imageTypes.toString()} onChange={handleImage}></input>  </h2>
            </section>

            <article className="edit-profile__information">
                <h1 className="edit-profile__role"> Role: { user.role } </h1>
                <h2 className="edit-profile__email"> Email: { user.email } </h2>
                <textarea className="edit-profile__bio" defaultValue={user.bio} placeholder="About me" />
            </article>

            <button className="accountButton" type="submit">Save</button>
        </form>
    );
}