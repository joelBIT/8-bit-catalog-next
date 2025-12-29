import { NextResponse } from "next/server";
import { Resend } from "resend";
import NewsletterEmail from "@/app/_components/email/NewsletterEmail";
import { isAuthenticatedAdmin } from "@/app/_session/sessionUtils";
import { getAllNewsletterSubscribers } from "@/app/_db/newsletter-db";

/**
 * Send the chosen news as a newsletter to all subscribed email addresses.
 */
export async function POST(request: Request): Promise<NextResponse> {
    const { text, heading } = await request.json();
    const isAdmin = await isAuthenticatedAdmin();

    if (isAdmin) {
        try {
            const subscribers = await getAllNewsletterSubscribers();
            for (let i = 0; i < subscribers.length; i++) {

                await sendNewsletterMail(subscribers[i], heading, text);
            }
            return NextResponse.json({ message: 'Newsletter successfully sent' }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: 'Could not send newsletter' }, { status: 500 });
        }
    }

    return NextResponse.json({ error: 'Unauthorized to send newsletter' }, { status: 401 });
}

/**
 * Sends an email containing a newsletter to the supplied email address.
 */
async function sendNewsletterMail(email: string, heading: string, text: string): Promise<void> {
    const resend = new Resend(process.env.RESEND_API_KEY as string);

    await resend.emails.send({
        from: '8bit <onboarding@joel-rollny.eu>',
        to: email,
        subject: heading,
        react: NewsletterEmail(text),
    });
}