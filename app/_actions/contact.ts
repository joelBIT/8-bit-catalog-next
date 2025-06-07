'use server';

import { Resend } from "resend";
import { ActionState } from "@/app/_types/types";
import ContactMessageEmail from "../_components/email/ContactMessageEmail";

/**
 * This function is invoked when a user sends a message from the contact page.
 */
export async function sendMessage(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    try {
        sendContactMessageMail(email, name, subject, message);
        return { message: 'Message was sent', success: true };
    } catch (error) {
        console.log(error);
        return { message: 'Could not send message', success: false };
    }
}

/**
 * Sends an email to contact address containing the supplied message, subject and email (from address).
 */
async function sendContactMessageMail(email: string, name: string, subject: string, message: string): Promise<void> {
    const resend = new Resend(process.env.RESEND_API_KEY as string);

    await resend.emails.send({
        from: '8bit <onboarding@joel-rollny.eu>',
        to: "joel.rollny@gmail.com",
        subject: subject,
        react: ContactMessageEmail(email, name, message),
    });
}
