'use client';

import { ReactElement, useActionState, useState, useEffect } from "react";
import { useAccount } from "@/app/_hooks";
import { updateUserDetails } from "@/app/_actions/account";
import PhoneInput from "react-phone-input-2";
import { SelectCountry } from "../common";

import 'react-phone-input-2/lib/style.css';
import "./EditUserDetailsForm.css";

const initialState = { 
    message: '', success: false, firstName: '', lastName: '', bio: '',
    country: '', fullName: '', address: '', birthDate: '', city: '' 
}

export function EditUserDetailsForm(): ReactElement {
    const { user, addUser } = useAccount();
    const [state, formAction] = useActionState(updateUserDetails.bind(null, user.id), initialState);
    const [showMessage, setShowMessage] = useState<boolean>(false);

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
                        defaultValue={state.firstName ? state.firstName : user.first_name} 
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
                        defaultValue={state.lastName ? state.lastName : user.last_name} 
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
                        defaultValue={state.bio ? state.bio : user.bio} 
                        placeholder="About me" 
                    />
                </section>

                <section className="input">
                    <input 
                        id="birthDate"
                        name="birth_date" 
                        type="date"
                        max={new Date().toLocaleDateString('en-ca')}
                        defaultValue={state.birthDate ? state.birthDate : user?.birth_date} 
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
                        defaultValue={state.fullName ? state.fullName : user?.full_name} 
                        type="text"
                        className="input-field"
                        autoComplete="none" 
                    />
                </section>

                <SelectCountry selected={state.country ? state.country : user.country} />

                <section className="information-input">
                    <label className="input-label" htmlFor="address">
                        Address
                    </label>

                    <input 
                        id="address"
                        name="address" 
                        type="text"
                        defaultValue={state.address ? state.address : user?.address} 
                        className="input-field"
                        autoComplete="none"
                    />
                </section>
            
                <section className="information-input">
                    <label className="input-label" htmlFor="city">
                        City
                    </label>

                    <input 
                        id="city"
                        name="city" 
                        type="text"
                        defaultValue={state.city ? state.city : user?.city} 
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