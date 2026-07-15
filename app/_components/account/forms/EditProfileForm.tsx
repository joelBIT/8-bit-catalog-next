'use client';

import { ReactElement, useActionState, useState, useEffect } from "react";
import { updateProfile } from "@/app/_actions/profile";
import PhoneInput from "react-phone-input-2";
import { ActionState } from "@/app/_types/types";
import { InsertProfile, Profile } from "@/app/_db/schema/profiles";

import 'react-phone-input-2/lib/style.css';
import "./EditProfileForm.css";

export function EditProfileForm({ profile }: { profile: Profile }): ReactElement {
    const initialState: ActionState & InsertProfile = { 
        message: '', success: false, userId: profile.userId, image: profile.image, firstName: profile.firstName, 
        lastName: profile.lastName, bio: profile.bio, birthDate: profile.birthDate, phone: profile.phone
    }
    const [state, formAction] = useActionState(updateProfile, initialState);
    const [showMessage, setShowMessage] = useState<boolean>(false);

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
            <form id="profileForm" action={formAction}>
                <section className="information-input">
                    <label className="input-label" htmlFor="first_name">
                        First name
                    </label>

                    <input 
                        id="first_name"
                        name="first_name"
                        type="text"
                        className="input-field"
                        autoComplete="none"
                        defaultValue={state.firstName ?? ''} 
                    />
                </section>

                <section className="information-input">
                    <label className="input-label" htmlFor="last_name">
                        Last name
                    </label>

                    <input 
                        id="last_name"
                        name="last_name"
                        type="text"
                        className="input-field"
                        autoComplete="none"
                        defaultValue={state.lastName ?? ''} 
                    />
                </section>

                <section className="information-input">
                    <label className="input-label" htmlFor="bio">
                        Bio
                    </label>

                    <textarea 
                        id="bio"
                        name="bio" 
                        className="input-field edit-profile__bio"
                        defaultValue={state.bio ?? ''} 
                        placeholder="About me" 
                    />
                </section>

                <section className="input">
                    <input 
                        id="birthDate"
                        name="birth_date" 
                        type="date"
                        max={new Date().toLocaleDateString('en-ca')}
                        defaultValue={state.birthDate ? state.birthDate.toString() : profile.birthDate?.toString()} 
                        className="form__field"
                    />

                    <span className="form__field-label">
                        Date of Birth
                    </span>
                </section>

                <section className="information-input">
                    <label className="input-label" htmlFor="phone">
                        Phone number
                    </label>

                    <PhoneInput country={state.success ? "se" : undefined} inputProps={{name: 'phone', autoComplete: "none"}} />
                </section>
                
                <button className="authButton" type="submit">
                    <span className="authButton__text"> Save </span>
                </button>
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