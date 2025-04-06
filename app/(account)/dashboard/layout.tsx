import { ReactElement } from "react";
import { AccountMenu } from "@/components/account";
import { AccountContexProvider } from "@/contexts/AccountContextProvider";

import "./layout.css";

export default function Layout({ children }: { children: React.ReactNode }): ReactElement {
    return (
        <section id="dashboardLayout">
            <AccountMenu />
            <AccountContexProvider> {children} </AccountContexProvider>
        </section>
    );
}