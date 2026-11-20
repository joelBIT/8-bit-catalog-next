import { NextResponse } from "next/server";
import { getAllUsers } from "@/app/_db/users-db";
import { isAuthenticatedAdmin } from "@/app/_auth/server-functions";

/**
 * Used by admins to retrieve a list of all existing users. 
 */
export async function GET(): Promise<NextResponse> {
    if (!(await isAuthenticatedAdmin())) {
        return NextResponse.json({ error: 'Admins only' }, { status: 403 });
    }

    try {
        const users = await getAllUsers();
        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Could not retrieve users' }, { status: 500 });
    }
}