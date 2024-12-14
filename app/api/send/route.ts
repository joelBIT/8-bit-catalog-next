import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_RESEND_API_KEY as string}`,
        },
        body: JSON.stringify({
            from: '8bit <onboarding@joel-rollny.eu>',
            to: [data.email],
            subject: data.subject,
            html: `<strong>${data.text}</strong>`,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        return Response.json(data);
    }
}