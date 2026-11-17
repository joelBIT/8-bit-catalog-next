'use client';

import { ReactElement, useActionState, useState } from "react";
import { updateProfile } from "@/app/_actions/profile";
import PhoneInput from "react-phone-input-2";
import { Profile } from "@/app/_db/schema/profiles";
import { toDateInputValue } from "@/app/_utils/utils";
import { FlashMessage } from "../../common";

import 'react-phone-input-2/lib/style.css';
import "./EditProfileForm.css";

export function EditProfileForm({ profile }: { profile: Profile }): ReactElement {
    const initalState = {firstName: profile.firstName, lastName: profile.lastName, phone: profile.phone, bio: profile.bio, birthDate: profile.birthDate};
    const [state, formAction] = useActionState(updateProfile, {message: '', success: false, ...initalState});
    const [phone, setPhone] = useState<string>(state.phone ?? '');

    return (
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
                    id="birth_date"
                    name="birth_date" 
                    type="date"
                    max={new Date().toLocaleDateString('en-ca')}
                    defaultValue={toDateInputValue(state.birthDate)}
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

                <PhoneInput 
                    country="se"
                    value={phone}
                    onChange={setPhone}
                    inputProps={{ id: 'phone', name: 'phone', autoComplete: 'tel' }}
                />
            </section>
            
            <button className="authButton" type="submit">
                <span className="authButton__text"> Save </span>
            </button>

            <FlashMessage state={state} />
        </form>
    );
}