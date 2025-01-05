import { ReactElement } from "react";
import { SiteLinks } from "./SiteLinks";
import { Contact } from "./Contact";
import { OtherLinks } from "./OtherLinks";
import { createAuthClient } from '@/utils/supabase/server';

import "./Footer.css";

export async function Footer(): Promise<ReactElement> {

    async function isAuthenticated() {
        const serverClient = await createAuthClient();
        const { data: { user } } = await serverClient.auth.getUser();
        if (user) {
            return user.role === "authenticated";
        }
        return false;
    }

    return (
        <footer>
            <section id="footerComponents">
                <SiteLinks authenticated={await isAuthenticated()} />
                <Contact />
                <OtherLinks />
            </section>
            <h4 id="copyright"><span className="material-symbols-outlined">copyright</span> 2025 Joel Rollny</h4>
        </footer>
    );
}