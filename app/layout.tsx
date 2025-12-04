import type { Metadata } from "next";
import { GameContextProvider, GamesProvider } from "./_contexts";

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
                <GamesProvider>
                    <GameContextProvider>
                        {children} 
                    </GameContextProvider>
                </GamesProvider>
            </body>
        </html>
    );
}
