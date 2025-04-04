'use client';

import { ReactElement } from "react";
import { AuthenticatedNavBar, NavBar } from ".";

/**
 * If the user is authenticated the navbar with account and logout icons is shown. Otherwise the regular navbar 
 * with the login icon is shown.
 */
export function NavBars({ authenticated } : { authenticated: boolean }): ReactElement {
    
    return (
        <>
            { authenticated ? <AuthenticatedNavBar /> : <NavBar /> }
        </>
    );
}