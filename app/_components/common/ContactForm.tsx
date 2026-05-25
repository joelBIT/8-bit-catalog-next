'use server';

import { type ReactElement } from "react";
import { Resend } from "resend";
import ContactMessageEmail from "../email/ContactMessageEmail";

import "./ContactForm.css";

export async function ContactForm(): Promise<ReactElement> {

    async function sendMessage(formData: FormData): Promise<void> {
        'use server';

        const email = formData.get('email') as string;
        const from = formData.get('name') as string;
        const message = formData.get('message') as string;

        try {
            const resend = new Resend(process.env.RESEND_API_KEY as string);

            await resend.emails.send({
                from: '8bit <onboarding@joel-rollny.eu>',
                to: "joel.rollny@gmail.com",
                subject: 'Contact question',
                react: ContactMessageEmail(email, from, message),
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <form id="contactForm" action={sendMessage}>
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

            <button id="sendButton" className="authButton" type="submit">
                <span> Send </span>
            </button>
        </form>
    );
}