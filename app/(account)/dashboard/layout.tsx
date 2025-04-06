import { ReactElement } from "react";
import { AccountMenu } from "@/components/account/AccountMenu";

import "./layout.css";

export default function Layout({ children }: { children: React.ReactNode }): ReactElement {
    return (
        <section id="dashboardLayout">
            <AccountMenu />
            { children }
        </section>
    );
}