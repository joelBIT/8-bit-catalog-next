'use client';

import { ReactElement } from "react";
import { NavBar } from "./NavBar";
import { AuthenticatedNavBar } from "./AuthenticatedNavBar";

export function NavBars({ authenticated } : { authenticated: boolean }): ReactElement {
    
    return (
        <>
            { authenticated ? <AuthenticatedNavBar /> : <NavBar /> }
        </>
    );
}