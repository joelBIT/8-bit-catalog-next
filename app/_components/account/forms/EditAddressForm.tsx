'use client';

import { ReactElement, useActionState, useState, useEffect } from "react";
import { updateAddress } from "@/app/_actions/address";
import { SelectCountry } from "../../common";
import { ActionState } from "@/app/_types/types";
import { Address, InsertAddress } from "@/app/_db/schema/addresses";
import { getUser } from "@/app/_auth/client-functions";

import "./EditAddressForm.css";

export function EditAddressForm({address}: {address: Address}): ReactElement {
    const initialState: ActionState & InsertAddress = {message: '', success: false, zipCode: address.zipCode, 
        country: address.country, city: address.city, street: address.street, userId: getUser().id};
    const [state, formAction] = useActionState(updateAddress, initialState);
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
            <form id="editAddressForm" action={formAction}>
                <SelectCountry selected={state.country ?? ''} />

                <section className="information-input">
                    <label className="input-label" htmlFor="street">
                        Street
                    </label>

                    <input 
                        id="street"
                        name="street" 
                        type="text"
                        defaultValue={state.street ?? ''} 
                        className="input-field"
                        autoComplete="none"
                    />
                </section>

                <section className="information-input">
                    <label className="input-label" htmlFor="zip_code">
                        Zip code
                    </label>

                    <input 
                        id="zip_code"
                        name="zip_code" 
                        type="text"
                        defaultValue={state.zipCode ?? ''} 
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
                        defaultValue={state.city ?? ''} 
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