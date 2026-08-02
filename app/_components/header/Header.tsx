'use client';

import { ReactElement } from "react";
import Link from "next/link";
import { NavBar } from ".";
import { URL_HOME } from "@/app/_utils/utils";
import { isAuthenticated, isAuthenticatedAdmin } from "@/app/_auth/client-functions";
import { Logo } from "../home";

import "./Header.css";

export function Header(): ReactElement {
    return (
        <header id="header">
            <Link href={URL_HOME} id="logoLink">
                <Logo />
            </Link>
            <NavBar authenticated={isAuthenticated()} isAdmin={isAuthenticatedAdmin()} />
        </header>
    );
}