'use client';

import { useActionState, type ReactElement } from "react";
import { sendContactEmail } from "@/app/_actions/contact";
import { StateMessage } from "../common";

import "./ContactForm.css";

export function ContactForm(): ReactElement {
    const [state, formAction, pending] = useActionState(sendContactEmail, {message: '', success: false}); 
    
    return (
        <form id="contactForm" action={formAction}>
            {/* Honeypot: hidden from people, but bots tend to fill every field */}
            <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="honeypot"
            />

            <section className="information-input">
                <input 
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    aria-label="Name"
                    className={`input-field`}
                    autoComplete="none" 
                    maxLength={100}
                    defaultValue={state.values?.name}
                    required
                />
            </section>

            <section className="information-input">
                <input 
                    id="email"
                    name="email" 
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    className={`input-field`}
                    autoComplete="off" 
                    maxLength={254}
                    defaultValue={state.values?.email}
                    required 
                />
            </section>

            <section className="information-input">
                <textarea 
                    id="message" 
                    name="message" 
                    placeholder="Message" 
                    aria-label="Message"
                    className={`input-field`} 
                    maxLength={2000}
                    defaultValue={state.values?.message}
                    required 
                />
            </section>

            <button id="sendButton" className="authButton" type="submit" disabled={pending}>
                <span> Send </span>
            </button>

            <StateMessage state={state} />
        </form>
    );
}