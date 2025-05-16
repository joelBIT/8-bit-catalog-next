import type { Metadata } from "next";
import { blinker } from "@/fonts/fonts";

import "./globals.css";

export const metadata: Metadata = {
    title: "The 8-bit Catalog",
    description: "Contains information about 8-bit NES games",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${blinker.className}`}>
                {children} 
            </body>
        </html>
    );
}
