import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { URL_DASHBOARD_PAGE } from "@/app/_utils/utils";
import { getSessionUser } from "@/app/_auth/api-guards";

/**
 * Protected routes. Only guests (no logged in users allowed) can access these routes. 
 * Usually used for login and register pages.
 */
export async function GuestOnly({ children }: { children: ReactNode }) {
    if (await getSessionUser()) {
        redirect(URL_DASHBOARD_PAGE);
    }
    return children;
}