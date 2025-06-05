'use client';

import { ReactElement, useActionState } from "react";
import { resetPassword } from "@/app/_actions/auth";
import { arima } from "@/app/_fonts/fonts";

import "./ResetPasswordForm.css";

/**
 * Form used when resetting a forgotten password for an account. An email containing the new password 
 * is sent to the supplied mail address.
 */
export function ResetPasswordForm(): ReactElement {
    const [ state, formAction ] = useActionState(resetPassword, { message: '', success: false });

    return (
        <section id="resetPasswordForm" className={arima.className}>
            { 
                state?.message ? 
                    <h2 className={state?.success ? "message-success" : "message-failure"}>
                        {state?.message}
                    </h2> : <></> 
            }
        </section>
    );
}