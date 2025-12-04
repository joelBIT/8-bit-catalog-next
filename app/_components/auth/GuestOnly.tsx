import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { URL_DASHBOARD_PAGE } from "@/app/_utils/utils";

/**
 * Protected routes. Only guests (no logged in users allowed) can access these routes. 
 * Usually used for login and register pages.
 */
export async function GuestOnly({ children }: { children: ReactNode }) {
    const cookie = (await cookies()).get("session")?.value ?? null;

    if (cookie) {
        redirect(URL_DASHBOARD_PAGE);
    }
    
    return children;
}