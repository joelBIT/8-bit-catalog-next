import { NextResponse } from "next/server";
import { z } from "zod";
import NewsletterEmail from "@/app/_components/email/NewsletterEmail";
import { getAllNewsletterSubscribers } from "@/app/_db/newsletter-db";
import { isAuthenticatedAdmin } from "@/app/_auth/server-functions";
import { sendEmailBatch } from "@/app/_utils/email";

const newsletterBody = z.object({
    heading: z.string().trim().min(1).max(150),
    text: z.string().trim().min(1).max(10_000)
});

/**
 * Send the chosen news as a newsletter to all subscribed email addresses.
 */
export async function POST(request: Request): Promise<NextResponse> {
    if (!(await isAuthenticatedAdmin())) {
        return NextResponse.json({ error: 'Unauthorized to send newsletter' }, { status: 401 });
    }

    const parsed = newsletterBody.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
        return NextResponse.json({ error: 'Heading and text are required', issues: parsed.error.issues }, { status: 400 });
    }

    try {
        const subscribers = await getAllNewsletterSubscribers();
        const emails = subscribers
            .filter(address => z.email().safeParse(address).success)
            .map(address => ({
                to: address,
                subject: parsed.data.heading,
                react: NewsletterEmail(parsed.data.text)
            }));

        const { sent, failed } = await sendEmailBatch(emails);

        if (emails.length > 0 && sent === 0) {
            return NextResponse.json({ error: 'Could not send newsletter', sent, failed }, { status: 502 });
        }
        return NextResponse.json({ message: 'Newsletter sent', sent, failed }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Could not send newsletter' }, { status: 500 });
    }
}