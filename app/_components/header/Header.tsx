import { ReactElement } from "react";
import Link from "next/link";
import { NavBar } from ".";
import { URL_HOME } from "@/app/_utils/utils";
import { isAuthenticated } from "@/app/_session/sessionUtils";

import "./Header.css";

export async function Header(): Promise<ReactElement> {
    return (
        <header id="header">
            <Link href={URL_HOME} id="logoLink">
                <h1 className="header__title"> The 8-bit Catalog </h1>
            </Link>
            <NavBar authenticated={await isAuthenticated()} />
        </header>
    );
}