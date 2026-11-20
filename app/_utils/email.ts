import 'server-only';

import type { ReactNode } from 'react';
import { Resend } from 'resend';
import { BatchEmail } from '../_types/types';

const resend = new Resend(process.env.RESEND_API_KEY as string);
const BATCH_SIZE = 100;         // Resend accepts at most 100 emails per batch request

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

/**
 * Sends many emails with as few requests as possible. Each recipient gets their own email (recipients never see
 * each other). A failed chunk is logged and counted instead of aborting the rest.
 */
export async function sendEmailBatch(messages: BatchEmail[]): Promise<{ sent: number; failed: number }> {
    const from = `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`;
    let sent = 0;
    let failed = 0;

    for (let i = 0; i < messages.length; i += BATCH_SIZE) {
        const chunk = messages.slice(i, i + BATCH_SIZE);

        try {
            const { error } = await resend.batch.send(chunk.map(message => ({ from, ...message })));

            if (error) {
                console.error(`Newsletter batch ${i / BATCH_SIZE + 1} failed: ${error.name} - ${error.message}`);
                failed += chunk.length;
            } else {
                sent += chunk.length;
            }
        } catch (error) {
            console.error(error);
            failed += chunk.length;
        }
    }

    return { sent, failed };
}