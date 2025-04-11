import { ReactElement } from "react";
import Link from "next/link";
import { NavBar, Logo } from ".";
import { irishGrover } from "@/fonts/fonts";
import { isAuthenticated } from "@/app/_session/utils";

import "./Header.css";

export async function Header(): Promise<ReactElement> {
    return (
        <header>
            <Link href="/" id="logoLink">
                <Logo />
                <h1 className={`header__title ${irishGrover.className}`}> The 8-bit Catalog </h1>
            </Link>
            <NavBar authenticated={await isAuthenticated()} />
        </header>
    );
}