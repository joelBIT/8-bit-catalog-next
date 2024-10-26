import Link from "next/link";
import { ReactElement } from "react";
import { Logo } from "./Logo";
import { NavBar } from "./NavBar";
import { irishGrover } from "@/fonts/fonts";

export function Header(): ReactElement {
    return (
        <header>
            <Link href="/" id="logoLink">
                <Logo /><h1 className={irishGrover.className}>The 8-bit Catalog</h1>
            </Link>
            <NavBar />
        </header>
    );
}