import { ReactNode } from "react";
import { UserOnly } from "@/app/_components/auth";

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <UserOnly>
            {children} 
        </UserOnly>
    );
}
