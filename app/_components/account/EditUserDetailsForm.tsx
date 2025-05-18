'use client';

import { ReactElement, useActionState, useState, useEffect, useContext } from "react";
import { arima } from "@/app/_fonts/fonts";
import { updateUserDetails } from "@/app/_actions/account";
import { AccountContext } from "@/app/_contexts/AccountContextProvider";

import "./EditUserDetailsForm.css";

export function EditUserDetailsForm(): ReactElement {
    const { user, addUser } = useContext(AccountContext);
    const [ state, formAction ] = useActionState(updateUserDetails.bind(null, user.id), { message: '', success: false, firstName: '', lastName: '', bio: '' });
    const [ showMessage, setShowMessage ] = useState<boolean>(false);

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

                <textarea 
                    name="bio" 
                    className={`edit-profile__bio ${arima.className}`} 
                    defaultValue={state.bio ? state.bio : user.bio} 
                    placeholder="About me" 
                />

                <button className="gameButton" type="submit">Save</button>
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