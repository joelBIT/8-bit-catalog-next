import { ReactElement } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { NavBar } from "./NavBar";
import { AuthenticatedNavBar } from "./AuthenticatedNavBar";
import { irishGrover } from "@/fonts/fonts";
import { isAuthenticated } from "@/app/utils/utils";

import "./Header.css";

export async function Header(): Promise<ReactElement> {

    return (
        <header>
            <Link href="/" id="logoLink">
                <Logo />
                <h1 className={`header__title ${irishGrover.className}`}>The 8-bit Catalog</h1>
            </Link>
            { await isAuthenticated() ? <AuthenticatedNavBar /> : <NavBar /> }
        </header>
    );
}