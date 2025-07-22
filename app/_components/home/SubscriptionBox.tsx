'use client';

import { ReactElement } from "react";
import { arima } from "@/app/_fonts/fonts";

import "./SubscriptionBox.css";

export function SubscriptionBox(): ReactElement {
    return (
        <section id="newsletter">
            <img src="/metroidscreen.webp" id="newsletterBackground" alt="Metroid newsletter background" />
            <h2 className="subscription-text"> Subscribe to receive the newsletter.</h2>

            <form id="newsletterSignup">
                <input id="subscribeEmail" type="email" placeholder="Enter Email" required={true} />
                <button id="subscribeButton" type="submit" className={`button__link ${arima.className}`}> Subscribe </button>
            </form>
        </section>
    );
}