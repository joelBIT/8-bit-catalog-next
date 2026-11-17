'use server';

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import { ContactState } from "@/app/_types/types";
import ContactMessageEmail from "../_components/email/ContactMessageEmail";
import { countRecentContactRequests, recordContactRequest } from "../_db/contact-db";

const MAX_REQUESTS_PER_HOUR = 3;

const contactSchema = z.object({
    name: z.string().trim().min(1, 'Name is required').max(100, 'Name is too long'),
    email: z.email('Enter a valid email address').max(254),
    message: z.string().trim().min(10, 'Message is too short').max(2000, 'Message is too long (max 2000 characters)')
});

async function getClientIp(): Promise<string> {
    const requestHeaders = await headers();
    return requestHeaders.get('x-forwarded-for')?.split(',')[0].trim()
        ?? requestHeaders.get('x-real-ip')
        ?? 'unknown';
}

/**
 * Send an email using the contact form.
 */
export async function sendContactEmail(_prevState: ContactState, formData: FormData): Promise<ContactState> {
    // Honeypot: real users never see or fill this field. Pretend success so bots get no signal.
    if (formData.get('website')) {
        return { message: 'The message was sent', success: true };
    }

    // What the user typed. Returned with every failure so the form can show it again.
    const values = {
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        message: String(formData.get('message') ?? '')
    };

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
        return { message: parsed.error.issues[0].message, success: false, values };
    }
    const { name, email, message } = parsed.data;

    try {
        const ip = await getClientIp();
        const recent = await countRecentContactRequests(ip, new Date(Date.now() - 60 * 60 * 1000));
        if (recent >= MAX_REQUESTS_PER_HOUR) {
            return { message: 'Too many messages. Please try again later.', success: false, values };
        }
        await recordContactRequest(ip);         // counted before sending so failed sends count too

        const resend = new Resend(process.env.RESEND_API_KEY as string);
        const { error } = await resend.emails.send({
            from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
            to: `${process.env.CONTACT_EMAIL}`,
            replyTo: email,                     // replying in your mail client goes to the sender
            subject: 'Contact question',
            react: ContactMessageEmail(email, name, message),
        });

        if (error) {                            // Resend returns errors instead of throwing
            console.log(error);
            return { message: 'The message could not be sent', success: false, values };
        }

        return { message: 'The message was sent', success: true };      // no `values`: the form clears
    } catch (error) {
        console.log(error);
        return { message: 'The message could not be sent', success: false, values };
    }
}