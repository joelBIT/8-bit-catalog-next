import { headers } from "next/headers";
import { auth } from "../auth";

export async function isAuthenticated(): Promise<boolean> {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return false;
    }

    return true;
}