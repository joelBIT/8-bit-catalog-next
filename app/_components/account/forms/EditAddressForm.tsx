'use client';

import { ReactElement, useActionState } from "react";
import { updateAddress } from "@/app/_actions/address";
import { FlashMessage, SelectCountry } from "../../common";
import { Address } from "@/app/_db/schema/addresses";
import { AddressState } from "@/app/_types/types";

import "./EditAddressForm.css";

export function EditAddressForm({ address }: { address: Address }): ReactElement {
    const initialState: AddressState = {
        message: '', success: false, 
        zip_code: address.zipCode ?? '', country: address.country ?? '',
        city: address.city ?? '', street: address.street ?? ''
    };
    const [state, formAction] = useActionState(updateAddress, initialState);

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
                        defaultValue={state.zip_code ?? ''} 
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

            <FlashMessage state={state} />
        </>
    );
}