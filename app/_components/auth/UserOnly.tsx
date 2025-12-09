import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { URL_LOGIN_PAGE } from "@/app/_utils/utils";
import { validateSession } from "@/app/_session/session";

/**
 * Protected routes. Only users that are logged in can access these routes.
 */
export async function UserOnly({ children }: { children: ReactNode }) {
    const cookie = (await cookies()).get("session")?.value ?? null;
    
    if (cookie) {
        const session = await validateSession(cookie);
        if (session) {
            return children;
        }
    }

    redirect(URL_LOGIN_PAGE);
}