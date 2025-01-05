import { ReactElement } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { NavBar } from "./NavBar";
import { AuthenticatedNavBar } from "./AuthenticatedNavBar";
import { createAuthClient } from '@/utils/supabase/server';
import { irishGrover } from "@/fonts/fonts";

import "./Header.css";

export async function Header(): Promise<ReactElement> {

    async function isAuthenticated() {
        const serverClient = await createAuthClient();
        const { data: { user } } = await serverClient.auth.getUser();
        if (user) {
            return user.role === "authenticated";
        }
        return false;
    }

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