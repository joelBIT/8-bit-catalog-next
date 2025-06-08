import { NextResponse } from "next/server";
import { getFAQs } from "@/app/_db/db";

/**
 * Returns FAQs for FAQ page.
 */
export async function GET() {
    try {
        const faqs = await getFAQs();
        return NextResponse.json(faqs);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Could not retrieve FAQs' }, { status: 500 });
    }
}