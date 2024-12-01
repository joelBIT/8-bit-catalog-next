'use client';

import { ReactElement, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

import "./page.css";

export default function AccountPage(): ReactElement {
    const supabase = createClient();
    const { setUser } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (data.user && data.user.email) {
                setUser({ email: data.user.email, authenticated: data.user.aud === "authenticated" });
            }
        }
        
        fetchUser();
    }, []);

    return (
        <main id="accountPage">
            <h1>Logged in</h1>
        </main>
    );
}