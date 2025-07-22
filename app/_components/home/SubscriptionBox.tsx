'use client';

import { ReactElement, useActionState, useEffect, useState } from "react";
import { createNewsletterSubscription } from "@/app/_actions/newsletter";
import { arima } from "@/app/_fonts/fonts";

import "./SubscriptionBox.css";

export function SubscriptionBox(): ReactElement {
    const [ showMessage, setShowMessage ] = useState<boolean>(false);
    const [ state, formAction ] = useActionState(createNewsletterSubscription, { message: '', success: false });

    useEffect(() => {
        if (state?.message && !showMessage) {       // Show message for a fixed amount of time
            setShowMessage(true);
        }
    }, [state]);

    return (
        <>
            <section id="newsletter">
                <img src="/metroidscreen.webp" id="newsletterBackground" alt="Metroid newsletter background" />
                <h2 className="subscription-text"> Subscribe to receive the newsletter.</h2>

                <form id="newsletterSignup" action={formAction}>
                    <input id="subscribeEmail" type="email" name="email" placeholder="Enter Email" required={true} />
                    <button id="subscribeButton" type="submit" className={`button__link ${arima.className}`}> Subscribe </button>
                </form>
            </section>

            {
                showMessage ?
                    <h2 className={state?.success ? "message-success" : "message-failure"}>
                        {state?.message}
                    </h2> : <></>
            }
        </>
    );
}