import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/app/auth";
import { URL_DASHBOARD_PAGE } from "@/app/_utils/utils";

/**
 * Protected routes. Only guests (no logged in users allowed) can access these routes. 
 * Usually used for login and register pages.
 */
export async function GuestOnly({ children }: { children: ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session) {
        redirect(URL_DASHBOARD_PAGE);
    }
    
    return children;
}