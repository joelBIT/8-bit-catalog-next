import { getUser, isAuthenticatedAdmin } from "@/app/_auth/server-functions";
import { getAddressByUserId } from "@/app/_db/addresses-db";
import { NextRequest, NextResponse } from "next/server";

/**
 * Returns profile information for supplied user ID.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('user_id') as string;
    const user = await getUser();

    if (!await isAuthenticatedAdmin() && user.id !== id) {
        return NextResponse.json({ error: 'You are not allowed to view addresses of other members, unless you are an admin.' }, { status: 401 });
    }

    try {
        const address = await getAddressByUserId(id);
        return NextResponse.json(address);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Could not retrieve address' }, { status: 500 });
    }
}