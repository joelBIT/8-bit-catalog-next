import { getSessionUser } from "@/app/_auth/api-guards";
import { getAddressByUserId } from "@/app/_db/addresses-db";
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
        return NextResponse.json({ error: 'You may only view your own address unless you are an admin' }, { status: 403 });
    }

    try {
        return NextResponse.json(await getAddressByUserId(id));
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Could not retrieve address' }, { status: 500 });
    }
}