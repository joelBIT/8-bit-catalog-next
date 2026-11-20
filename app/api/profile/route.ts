import { getSessionUser } from "@/app/_auth/api-guards";
import { getProfileByUserId } from "@/app/_db/profiles-db";
import { ROLE_ADMIN } from "@/app/_utils/utils";
import { NextRequest, NextResponse } from "next/server";

/**
 * Returns profile information for supplied user ID.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    const user = await getSessionUser();
    if (!user) {
        return NextResponse.json({ error: 'Must be logged in' }, { status: 401 });
    }

    const id = request.nextUrl.searchParams.get('user_id');
    if (!id) {
        return NextResponse.json({ error: 'user_id is required' }, { status: 400 });
    }

    if (user.id !== id && user.role !== ROLE_ADMIN) {
        return NextResponse.json({ error: 'You may only view your own profile unless you are an admin' }, { status: 403 });
    }

    try {
        return NextResponse.json(await getProfileByUserId(id));
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Could not retrieve profile' }, { status: 500 });
    }
}