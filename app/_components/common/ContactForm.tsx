'use client';

import { useActionState, useEffect, useState, type ReactElement } from "react";
import { sendContactEmail } from "@/app/_actions/contact";

import "./ContactForm.css";

export function ContactForm(): ReactElement {
    const [state, formAction, pending] = useActionState(sendContactEmail, {message: '', success: false});
    const [message, setMessage] = useState<string>(state.message);

    useEffect(() => {
        if (state.success) {
            setMessage(state.message);
        } else if (!state.success && state.message.length > 0) {
            setMessage(state.message);
        }
    }, [state]);    
    
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
                    required
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

            <button id="sendButton" className="authButton" type="submit" disabled={pending}>
                <span> Send </span>
            </button>

            { message.length > 0 ? <h2 className={state.success ? "message-success" : "message-failure"}> {message} </h2> : <></> }
        </form>
    );
}