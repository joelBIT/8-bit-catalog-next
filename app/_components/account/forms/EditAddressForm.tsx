'use client';

import { ReactElement, useActionState, useState, useEffect } from "react";
import { useAccount } from "@/app/_hooks";
import { updateUserAddress } from "@/app/_actions/account";
import { SelectCountry } from "../../common";
import { ActionState } from "@/app/_types/types";
import { InsertAddress } from "@/app/_db/schema/addresses";

import "./EditAddressForm.css";

export function EditAddressForm(): ReactElement {
    const { user, address } = useAccount();
    const initialState: ActionState & InsertAddress = {message: '', success: false, zipCode: address.zipCode, 
        country: address.country, city: address.city, street: address.street, userId: user.id};
    const [state, formAction] = useActionState(updateUserAddress, initialState);
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
                <SelectCountry selected={state.country ? state.country : address.country} />

                <section className="information-input">
                    <label className="input-label" htmlFor="zip_code">
                        Zip code
                    </label>

                    <input 
                        id="zip_code"
                        name="zip_code" 
                        type="text"
                        defaultValue={state.zipCode ? state.zipCode : address?.zipCode} 
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
                        defaultValue={state.city ? state.city : address?.city} 
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