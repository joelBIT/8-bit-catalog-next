import { ReactElement } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { NavBar } from "./NavBar";
import { irishGrover } from "@/fonts/fonts";

import "./Header.css";

export function Header(): ReactElement {
    return (
        <header>
            <Link href="/" id="logoLink">
                <Logo />
                <h1 className={`header__title ${irishGrover.className}`}>The 8-bit Catalog</h1>
            </Link>
            <NavBar />
        </header>
    );
}