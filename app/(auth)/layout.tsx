import { ReactNode } from "react";
import { GuestOnly } from "../_components/auth";


export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <GuestOnly>
            {children} 
        </GuestOnly>
    );
}
