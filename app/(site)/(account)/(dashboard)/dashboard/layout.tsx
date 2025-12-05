import { ReactElement } from "react";
import { AccountProvider } from "@/app/_contexts";
import { AccountMenu } from "@/app/_components/account";
import { getUserFromSession } from "@/app/_session/utils";
import { User } from "@/app/_types/types";

import "./layout.css";

export default async function Layout({ children }: { children: React.ReactNode }): Promise<ReactElement> {
    return (
        <section id="dashboardLayout">
            <AccountMenu user={await getUserFromSession() as User} />
            <AccountProvider> {children} </AccountProvider>
        </section>
    );
}