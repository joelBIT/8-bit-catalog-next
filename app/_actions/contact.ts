'use server';

import { ActionState } from "@/app/_types/types";
import { Resend } from "resend";
import ContactMessageEmail from "../_components/email/ContactMessageEmail";

/**
 * Send an email using the contact form.
 */
export async function sendContactEmail(_prevState: ActionState, formData: FormData): Promise<ActionState> {
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

        return { message: 'The message was sent', success: true };
    } catch (error) {
        console.log(error);
        return { message: 'The message could not be sent', success: false };
    }
}