import { ReactElement } from "react";
import { headers } from "next/headers";
import { auth } from "@/app/auth";
import { AccountProvider } from "@/app/_contexts";
import { AccountMenu } from "@/app/_components/account";
import { User } from "@/app/_db/schema/auth/users";

import "./layout.css";

export default async function Layout({ children }: { children: React.ReactNode }): Promise<ReactElement> {
    const session = await auth.api.getSession({
        headers: await headers(), // pass the incoming request headers
    });
  
    return (
        <section id="dashboardLayout">
            <AccountMenu user={session?.user as User} />
            <AccountProvider> {children} </AccountProvider>
        </section>
    );
}