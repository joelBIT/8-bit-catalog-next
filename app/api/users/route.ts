import { NextResponse } from "next/server";
import { getAllUsers } from "@/db/db";
import { isAuthenticated } from "@/app/_session/utils";

/**
 * Used to retrieve a list of all existing users. 
 */
export async function GET() {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return NextResponse.json({ message: "Must be authenticated to retrieve list of users" }, { status: 401 });
    }

    const users = await getAllUsers();
    return NextResponse.json(users);
}