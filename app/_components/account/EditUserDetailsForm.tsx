'use client';

import { ReactElement, useActionState, useState, useEffect, useContext } from "react";
import { arima } from "@/app/_fonts/fonts";
import { updateUserDetails } from "@/app/_actions/account";
import { AccountContext } from "@/app/_contexts/AccountContextProvider";
import PhoneInput from "react-phone-input-2";
import { SelectCountry } from "../common";

import "./EditUserDetailsForm.css";

export function EditUserDetailsForm(): ReactElement {
    const { user, addUser } = useContext(AccountContext);
    const [ state, formAction ] = useActionState(updateUserDetails.bind(null, user.id), { message: '', success: false, firstName: '', lastName: '', bio: '' });
    const [ showMessage, setShowMessage ] = useState<boolean>(false);
    const [ fullName, setFullName ] = useState<string>('');
    const [ address, setAddress ] = useState<string>('');
    const [ city, setCity ] = useState<string>('');
    const [ birthDate, setBirthDate ] = useState<string>('');

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
                <input 
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    placeholder="First Name" 
                    className={`${arima.className} input-field`}
                    defaultValue={state?.success ? state.firstName : user?.first_name} 
                />

                <input 
                    id="lastName" 
                    name="lastName" 
                    type="text" 
                    placeholder="Last Name" 
                    className={`${arima.className} input-field`}
                    defaultValue={state?.success ? state.lastName : user?.last_name} 
                />

                <textarea 
                    name="bio" 
                    className={`${arima.className} input-field edit-profile__bio`}
                    defaultValue={state.bio ? state.bio : user.bio} 
                    placeholder="About me" 
                />

                <section className="input">
                    <input 
                        id="birthDate"
                        name="birth_date" 
                        type="date"
                        max={new Date().toLocaleDateString('en-ca')}
                        value={birthDate}
                        onChange={e => setBirthDate(e.target.value)}
                        className={`${arima.className} form__field`}
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
                        value={fullName}
                        onChange={e => setFullName(e.target.value)} 
                        type="text"
                        className={`${arima.className} input-field`}
                        autoComplete="none" 
                    />
                </section>

                <SelectCountry />

                <section className="information-input">
                    <label className="input-label" htmlFor="address">
                        Address
                    </label>

                    <input 
                        id="address"
                        name="address" 
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className={`${arima.className} input-field`}
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
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className={`${arima.className} input-field`}
                        autoComplete="none"
                    />
                </section>

                <section className="information-input">
                    <label className="input-label" htmlFor="phone">
                        Phone number
                    </label>

                    <PhoneInput country={state.success ? "se" : undefined} inputProps={{name: 'phone', autoComplete: "none"}} />
                </section>
                
                <button className="button__link"> Save </button>
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