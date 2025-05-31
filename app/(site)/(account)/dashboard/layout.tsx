import { ReactElement } from "react";
import { AccountMenu } from "@/app/_components/account";
import { AccountContextProvider } from "@/app/_contexts";
import { getUserFromSession } from "@/app/_session/utils";
import { User } from "@/app/_types/types";

import "./layout.css";

export default async function Layout({ children }: { children: React.ReactNode }): Promise<ReactElement> {
    return (
        <section id="dashboardLayout">
            <AccountMenu user={await getUserFromSession() as User} />
            <AccountContextProvider> {children} </AccountContextProvider>
        </section>
    );
}