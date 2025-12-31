'use client';

import { ReactElement, useActionState, useState, useEffect } from "react";
import { useAccount } from "@/app/_hooks";
import { updateProfile } from "@/app/_actions/profile";
import PhoneInput from "react-phone-input-2";
import { ActionState } from "@/app/_types/types";
import { InsertProfile } from "@/app/_db/schema/profiles";

import 'react-phone-input-2/lib/style.css';
import "./EditUserDetailsForm.css";

export function EditUserDetailsForm(): ReactElement {
    const { user, profile } = useAccount();
    const initialState: ActionState & InsertProfile = { 
        message: '', success: false, userId: user.id, image: profile.image, firstName: profile.firstName, 
        lastName: profile.lastName, bio: profile.bio, fullName: profile.fullName, birthDate: profile.birthDate, phone: profile.phone
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
            <form id="userDetailsForm" action={formAction}>
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
                        defaultValue={state.firstName ? state.firstName : profile.firstName} 
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
                        defaultValue={state.lastName ? state.lastName : profile.lastName} 
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
                        defaultValue={state.bio ? state.bio : profile.bio} 
                        placeholder="About me" 
                    />
                </section>

                <section className="input">
                    <input 
                        id="birthDate"
                        name="birth_date" 
                        type="date"
                        max={new Date().toLocaleDateString('en-ca')}
                        defaultValue={state.birthDate ? state.birthDate.toString() : profile?.birthDate?.toString()} 
                        className="form__field"
                    />

                    <span className="form__field-label">
                        Date of Birth
                    </span>
                </section>

                <section className="information-input">
                    <label className="input-label" htmlFor="full_name">
                        Full name
                    </label>

                    <input 
                        id="fullName"
                        name="full_name"
                        defaultValue={state.fullName ? state.fullName : profile?.fullName} 
                        type="text"
                        className="input-field"
                        autoComplete="none" 
                    />
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