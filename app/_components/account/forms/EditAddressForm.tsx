'use client';

import { ReactElement, useActionState, useState, useEffect } from "react";
import { useAccount } from "@/app/_hooks";
import { updateUserAddress } from "@/app/_actions/account";
import { SelectCountry } from "../../common";

import "./EditAddressForm.css";

const initialState = { 
    message: '', success: false, zip_code: '', country: '', city: '', street: '' 
}

export function EditAddressForm(): ReactElement {
    const { user } = useAccount();
    const [state, formAction] = useActionState(updateUserAddress.bind(null, user.id), initialState);
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
            <form id="userAddressForm" action={formAction}>
                <SelectCountry selected={state.country ? state.country : user.country} />

                <section className="information-input">
                    <label className="input-label" htmlFor="zip_code">
                        Zip code
                    </label>

                    <input 
                        id="zip_code"
                        name="zip_code" 
                        type="text"
                        defaultValue={state.zip_code ? state.zip_code : user?.zip_code} 
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