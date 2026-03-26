import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { GameProvider, GamesProvider } from "./_contexts";
import { blinker } from "./_fonts/fonts";

import "./globals.css";

export const metadata: Metadata = {
    title: "The 8-bit Catalog",
    description: "Catalog covering 8-bit NES games"
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1
}

/**
 * Load the font file by importing blinker from it.
 */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${blinker.className}`}>
                <GamesProvider>
                    <GameProvider>
                        {children} 
                    </GameProvider>
                </GamesProvider>
            </body>
        </html>
    );
}
