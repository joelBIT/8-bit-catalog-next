import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    console.log(request);

    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_RESEND_API_KEY as string}`,
        },
        body: JSON.stringify({
            from: '8bit <onboarding@joel-rollny.eu>',
            to: ['joel.rollny@gmail.com'],
            subject: 'Welcome',
            html: '<strong>Welcome to the 8-bit Catalog</strong>',
        }),
    });

    if (res.ok) {
        const data = await res.json();
        return Response.json(data);
    }
}