'use client';

import { type ReactElement, useActionState } from "react";

import "./ContactForm.css";

export function ContactForm(): ReactElement {
    const [ state, formAction ] = useActionState(sendMessage,  null);

    function sendMessage(): void {
        console.log("sent");
        console.log(state);
    }
    
    return (
        <form id="contactForm" action={formAction}>
            <section className="information-input">
                <input 
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    className={`input-field`}
                    autoComplete="none" 
                />
            </section>

            <section className="information-input">
                <input 
                    id="email"
                    name="email" 
                    type="email"
                    placeholder="Email"
                    className={`input-field`}
                    autoComplete="off" 
                    required 
                />
            </section>

            <section className="information-input">
                <textarea id="message" name="message" placeholder="Message" className={`input-field`} required />
            </section>

            <button id="sendButton" className="authButton" type="submit">
                <span> Send </span>
            </button>
        </form>
    );
}