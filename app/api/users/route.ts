import { NextResponse } from "next/server";
import { getAllUsers } from "@/app/_db/users-db";
import { isAuthenticated } from "@/app/_session/sessionUtils";

/**
 * Used to retrieve a list of all existing users. 
 */
export async function GET(): Promise<NextResponse> {
    const authenticated = await isAuthenticated();
    if (authenticated) {
        try {
            const users = await getAllUsers();
            return NextResponse.json(users);
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: 'Could not retrieve users' }, { status: 500 });
        }
    }

    return NextResponse.json({ message: "Must be authenticated to retrieve list of users" }, { status: 401 });
}