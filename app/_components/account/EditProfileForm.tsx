'use client';

import { ReactElement, useActionState, useContext, useEffect, useState } from "react";
import { imageTypes } from "@/app/_utils/utils";
import { updateProfileImage } from "@/app/_actions/account";
import { AccountContext } from "@/app/_contexts/AccountContextProvider";

import "./EditProfileForm.css";

export function EditProfileForm(): ReactElement {
    const { user, addUser } = useContext(AccountContext);
    const [ state, formAction ] = useActionState(updateProfileImage.bind(null, user.id), { message: '', success: false, image: user?.image });
    const [ showMessage, setShowMessage ] = useState<boolean>(false);
    const STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE + `${user.id}/`;

    useEffect(() => {
            if (state?.message && !showMessage) {       // Show message for a fixed amount of time
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 5000);
            }

            if (state.success) {
                addUser();      // Update user in AccountContext
            }
        }, [state]);

    return (
        <>
            <form id="editProfileForm" action={formAction}>
                <section className="edit-profile-image">
                    <img src={state.image ? STORAGE_URL + state.image : STORAGE_URL + user?.image} className="profile-image" alt="Profile image" />

                    <h2 className="edit-profile__change-image"> 
                        Change profile image 
                        <input name="profileImage" className="edit-profile__input" type="file" accept={imageTypes.toString()} />
                    </h2>
                </section>

                <button className="button__link" > Save </button>
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