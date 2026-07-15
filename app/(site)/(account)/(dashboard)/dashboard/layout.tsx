import { ReactElement } from "react";
import { AccountMenu } from "@/app/_components/account";

import "./layout.css";

export default async function Layout({ children }: { children: React.ReactNode }): Promise<ReactElement> {
  
    return (
        <section id="dashboardLayout">
            <AccountMenu />
            {children}
        </section>
    );
}