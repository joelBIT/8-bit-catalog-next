import { ReactNode } from "react";
import type { Metadata } from "next";
import { Header } from "@/app/_components/header";
import { Footer } from "@/app/_components/footer";
import { FavouritesProvider } from "@/app/_contexts";

import "../globals.css";

export const metadata: Metadata = {
    title: "The 8-bit Catalog",
    description: "Contains information about 8-bit NES games",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <FavouritesProvider>
            <Header />
            {children} 
            <Footer />
        </FavouritesProvider>
    );
}
