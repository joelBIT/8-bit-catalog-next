import type { Metadata } from "next";
import { GameContextProvider } from "./_contexts";

import "./globals.css";

export const metadata: Metadata = {
    title: "The 8-bit Catalog",
    description: "Catalog covering 8-bit NES games",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <GameContextProvider>
                    {children} 
                </GameContextProvider>
            </body>
        </html>
    );
}
