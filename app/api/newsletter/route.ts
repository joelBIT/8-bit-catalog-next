import { NextResponse } from "next/server";
import { z } from "zod";
import NewsletterEmail from "@/app/_components/email/NewsletterEmail";
import { getAllNewsletterSubscribers } from "@/app/_db/newsletter-db";
import { isAuthenticatedAdmin } from "@/app/_auth/server-functions";
import { sendEmailBatch } from "@/app/_utils/email";

const newsletterBody = z.object({
    subject: z.string().trim().min(1).max(150),
    content: z.string().trim().min(1).max(10_000)
});

/**
 * Send the chosen news as a newsletter to all subscribed email addresses.
 */
export async function POST(request: Request): Promise<NextResponse> {
    if (!(await isAuthenticatedAdmin())) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const parsed = newsletterBody.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
        return NextResponse.json({ error: 'Invalid request', issues: parsed.error.issues }, { status: 400 });
    }

    try {
        const recipients = await getAllNewsletterSubscribers();
        const emails = recipients
            .filter(address => z.email().safeParse(address).success)    // one malformed address can make a whole batch fail
            .map(address => ({
                to: address,
                subject: parsed.data.subject,
                react: NewsletterEmail(parsed.data.content)
            }));

        if (emails.length === 0) {
            return NextResponse.json({ sent: 0, failed: 0 });
        }

        const { sent, failed } = await sendEmailBatch(emails);
        if (sent === 0) {
            return NextResponse.json({ error: 'Could not send the newsletter', sent, failed }, { status: 502 });
        }

        return NextResponse.json({ sent, failed });     // failed > 0 means a partial success
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Could not send the newsletter' }, { status: 500 });
    }
}