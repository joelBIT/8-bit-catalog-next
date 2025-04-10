import { ReactElement } from "react";
import { AccountMenu } from "@/components/account";
import { AccountContexProvider } from "@/contexts";
import { getUserFromSession } from "@/app/_session/utils";
import { User } from "@/types/types";

import "./layout.css";

export default async function Layout({ children }: { children: React.ReactNode }): Promise<ReactElement> {
    return (
        <section id="dashboardLayout">
            <AccountMenu user={await getUserFromSession() as User} />
            <AccountContexProvider> {children} </AccountContexProvider>
        </section>
    );
}