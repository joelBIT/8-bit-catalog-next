'use client';

import { ReactElement, useActionState, useEffect, useState } from "react";
import { useAccount } from "@/app/_hooks";
import { fileTypes } from "@/app/_utils/utils";
import { updateProfileImage } from "@/app/_actions/account";

import "./EditProfileForm.css";

export function EditProfileForm(): ReactElement {
    const { user, profile } = useAccount();
    const [state, formAction] = useActionState(updateProfileImage.bind(null, user.id), { message: '', success: false, image: profile?.image });
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE + `${user.id}/`;

    useEffect(() => {
        if (state?.message && !showMessage) {       // Show message for a fixed amount of time
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }
    }, [state]);

    return (
        <>
            <form id="editProfileForm" action={formAction}>
                <section className="edit-profile-image">
                    <img src={state.image ? STORAGE_URL + state.image : STORAGE_URL + profile?.image} className="profile-image" alt="Profile image" />

                    <section className="edit-profile__change-image"> 
                        <h1> Change profile image </h1> 
                        <input name="profileImage" className="edit-profile__input" type="file" accept={fileTypes.toString()} />
                    </section>
                </section>

                <button className="button__link" > Update </button>
            </form>

            { 
                showMessage ? 
                    <h2 className={state?.success ? "message-success message-fade" : "message-failure message-fade"}>
                        {state?.message}
                    </h2> : <></> 
            }
        </>
    );
}