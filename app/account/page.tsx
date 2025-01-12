import { ReactElement } from "react";
import { createAuthClient } from '@/utils/supabase/server';

import "./page.css";

export default async function AccountPage(): Promise<ReactElement> {
    const supabase = await createAuthClient();
    const { data } = await supabase.auth.getUser();

    return (
        <main id="accountPage">
            <h1>{data && data.user ? data.user.email : "Logged in"}</h1>
        </main>
    );
}