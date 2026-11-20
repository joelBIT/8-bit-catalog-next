import { ReactNode } from "react";
import { UserOnly } from "@/app/_components/auth";

export default function AccountLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <UserOnly>
            {children} 
        </UserOnly>
    );
}
