'use client';

import { ReactElement, useActionState } from "react";
import { sendMessage } from "@/app/_actions/contact";

import "./ContactForm.css";

/**
 * Lets a user send an email to me.
 */
export function ContactForm(): ReactElement {
    const [ state, formAction ] = useActionState(sendMessage, { message: '', success: false });
    
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
                    className="input-field"
                    autoComplete="none" 
                />
            </section>

            <section className="information-input">
                <label className="input-label" htmlFor="email">
                    Email
                </label>

                <input 
                    id="email"
                    name="email" 
                    type="email"
                    className="input-field"
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
                    className="input-field"
                    autoComplete="none" 
                />
            </section>

            <section className="information-input">
                <label className="input-label" htmlFor="message">
                    Message
                </label>

                    <textarea id="message" name="message" className="input-field" required />
            </section>

            { 
                state?.message ? 
                    <h2 className={state?.success ? "message-success" : "message-failure"}>
                        {state?.message}
                    </h2> : <></> 
            }

            <button id="sendButton" className="authButton" type="submit">
                <span className="authButton__text"> Send </span>
            </button>
        </form>
    );
}