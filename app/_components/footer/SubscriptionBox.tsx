'use client';

import { ReactElement, useActionState, useEffect, useState } from "react";
import { createNewsletterSubscription } from "@/app/_actions/newsletter";

import "./SubscriptionBox.css";

/**
 * Enables users to sign up for the newsletter.
 */
export function SubscriptionBox(): ReactElement {
    const [ showMessage, setShowMessage ] = useState<boolean>(false);
    const [ state, formAction ] = useActionState(createNewsletterSubscription, { message: '', success: false });

    useEffect(() => {
        if (state?.message && !showMessage) {       // Show message for a fixed amount of time
            setShowMessage(true);
        }
        setTimeout(() => setShowMessage(false), 5000);
    }, [state]);

    return (
        <section id="newsletter">
            <h2 className="subscription-text"> Subscribe to receive the newsletter</h2>

            <form id="newsletterSignup" action={formAction}>
                <input id="subscribeEmail" type="email" name="email" placeholder="Enter Email" required={true} autoComplete="off" />
                <button id="subscribeButton" type="submit" className="button__link"> Subscribe </button>
            </form>

            {
                showMessage ?
                    <h2 className={state?.success ? "message-success" : "message-failure"}>
                        {state?.message}
                    </h2> : <></>
            }
        </section>
    );
}