import type { Metadata } from "next";
import { Header } from "@/app/_components/header";
import { Footer } from "@/app/_components/footer";
import { blinker } from "@/fonts/fonts";
import { FavouritesContexProvider } from "@/contexts";

import "../globals.css";

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
                <Header />
                    <FavouritesContexProvider> {children} </FavouritesContexProvider>
                <Footer />
            </body>
        </html>
    );
}
