import { getAddressByUserId } from "@/app/_db/addresses-db";
import { NextRequest, NextResponse } from "next/server";

/**
 * Returns profile information for supplied user ID.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('user_id') as string;

    try {
        const address = await getAddressByUserId(parseInt(id));
        return NextResponse.json(address);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Could not retrieve address' }, { status: 500 });
    }
}