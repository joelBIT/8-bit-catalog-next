import { getProfileByUserId } from "@/app/_db/profiles-db";
import { NextRequest, NextResponse } from "next/server";

/**
 * Returns profile information for supplied user ID.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('user_id') as string;

    try {
        const profile = await getProfileByUserId(parseInt(id));
        return NextResponse.json(profile);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Could not retrieve profile' }, { status: 500 });
    }
}