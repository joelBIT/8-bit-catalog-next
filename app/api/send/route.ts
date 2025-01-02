import EmailTemplate from "@/components/email/EmailTemplate";
import { Resend } from 'resend';
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();

    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY as string);

    const response = await resend.emails.send({
        from: '8bit <onboarding@joel-rollny.eu>',
        to: [data.email],
        subject: data.subject,
        react: EmailTemplate(),
    });

    return Response.json(response);
}