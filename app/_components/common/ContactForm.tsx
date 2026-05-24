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
                <label className="input-label" htmlFor="name">
                    Name
                </label>

                <input 
                    id="name"
                    name="name"
                    type="text"
                    className={`input-field`}
                    autoComplete="none" 
                />
            </section>

            <section className="information-input">
                <label className="input-label required" htmlFor="email">
                    Email
                </label>

                <input 
                    id="email"
                    name="email" 
                    type="email"
                    className={`input-field`}
                    autoComplete="off" 
                    required 
                />
            </section>

            <section className="information-input">
                <label className="input-label" htmlFor="subject">
                    Subject
                </label>

                <input 
                    id="subject"
                    name="subject"
                    type="text"
                    className={`input-field`}
                    autoComplete="none" 
                />
            </section>

            <section className="information-input">
                <label className="input-label required" htmlFor="message">
                    Message
                </label>

                <textarea id="message" name="message" className={`input-field`} required />
            </section>

            <button id="sendButton" className="sendButton" type="submit">
                <span> Send </span>
            </button>
        </form>
    );
}