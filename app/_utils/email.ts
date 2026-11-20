import 'server-only';

import type { ReactNode } from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

/**
 * Sends an email with Resend. Resend reports most failures (invalid API key, unverified domain, rate limit,
 * bad address) as a returned `error` instead of throwing, so it must be checked explicitly.
 */
export async function sendEmail({ to, subject, react }: { to: string; subject: string; react: ReactNode }): Promise<void> {
    const { error } = await resend.emails.send({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
        to,
        subject,
        react
    });

    if (error) {
        throw new Error(`Could not send email "${subject}": ${error.name} - ${error.message}`);
    }
}