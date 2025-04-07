'use client';

import { ReactElement, useActionState, useState, useEffect, useContext } from "react";
import { arima } from "@/fonts/fonts";
import { updateUserDetails } from "@/actions/account";
import { AccountContext } from "@/contexts/AccountContextProvider";

import "./EditUserDetailsForm.css";

export function EditUserDetailsForm(): ReactElement<ReactElement> {
    const { user } = useContext(AccountContext);
    const [ state, formAction ] = useActionState(updateUserDetails.bind(null, user.id), { message: '', success: false, firstName: "", lastName: "" });
    const [ showMessage, setShowMessage ] = useState<boolean>(false);

    useEffect(() => {
        if (state?.message && !showMessage) {       // Show message for a fixed amount of time
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }
    }, [state]);

    return (
        <section id="userDetails-edit__card">
            { showMessage ? 
                <section>
                    <h2 className={state?.success ? "message-success message-fade" : "message-failure message-fade"}>
                        {state?.message}
                    </h2>
                </section> : <></> 
            }

            <section id="accountCard" className={arima.className}>
                <h1 className="accountCard__title">Edit Information</h1>

                <form id="accountForm" action={formAction}>
                    <input 
                        id="firstName" 
                        name="firstName" 
                        type="text" 
                        placeholder="First Name" 
                        className={arima.className} 
                        defaultValue={state?.success ? state.firstName : user?.first_name} 
                    />

                    <input 
                        id="lastName" 
                        name="lastName" 
                        type="text" 
                        placeholder="Last Name" 
                        className={arima.className} 
                        defaultValue={state?.success ? state.lastName : user?.last_name} 
                    />

                    <button className="gameButton" type="submit">Save</button>
                </form>
            </section>
        </section>
        
    );
}