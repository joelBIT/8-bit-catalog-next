import { ReactElement } from "react";
import Link from "next/link";
import { Logo, NavBars } from ".";
import { irishGrover } from "@/fonts/fonts";
import { isAuthenticated } from "@/app/utils/utils";

import "./Header.css";

export async function Header(): Promise<ReactElement<ReactElement>> {

    return (
        <header>
            <Link href="/" id="logoLink">
                <Logo />
                <h1 className={`header__title ${irishGrover.className}`}>The 8-bit Catalog</h1>
            </Link>
            <NavBars authenticated={await isAuthenticated()} />
        </header>
    );
}