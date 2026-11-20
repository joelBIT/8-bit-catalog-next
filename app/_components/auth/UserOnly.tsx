import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { URL_LOGIN_PAGE } from "@/app/_utils/utils";
import { getSessionUser } from "@/app/_auth/api-guards";

/**
 * Protected routes. Only users that are logged in can access these routes.
 */
export async function UserOnly({ children }: { children: ReactNode }) {
    if (!(await getSessionUser())) {
        redirect(URL_LOGIN_PAGE);
    }
    return children;
}