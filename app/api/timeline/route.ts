import { getTimeline } from "@/app/_db/timeline-db";
import { NextResponse } from "next/server";

/**
 * Returns timeline for about page.
 */
export async function GET(): Promise<NextResponse> {
    try {
        const timeline = await getTimeline();
        return NextResponse.json(timeline);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Could not retrieve timeline' }, { status: 500 });
    }
}