import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/app/auth";
import { URL_LOGIN_PAGE } from "@/app/_utils/utils";

/**
 * Protected routes. Only users that are logged in can access these routes.
 */
export async function UserOnly({ children }: { children: ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session) {
        return children;
    }

    redirect(URL_LOGIN_PAGE);
}