import { ReactNode } from "react";
import type { Metadata } from "next";
import { GameProvider, GamesProvider } from "./_contexts";

import "./globals.css";

export const metadata: Metadata = {
    title: "The 8-bit Catalog",
    description: "Catalog covering 8-bit NES games",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <GamesProvider>
                    <GameProvider>
                        {children} 
                    </GameProvider>
                </GamesProvider>
            </body>
        </html>
    );
}
