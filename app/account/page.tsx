'use client';

import { ReactElement, useEffect } from "react";
import { createAuthClient } from "@/utils/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

import "./page.css";

export default function AccountPage(): ReactElement {
    const supabase = createAuthClient();
    const { user, setUser } = useAuth();

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
            <button onClick={() => sendMail(user ? user.email : '', "Failed login attempt", "Failed login attempt on 8bit Catalog")}>Skicka mail</button>
        </main>
    );
}

async function sendMail(email: string, subject: string, text: string) {
    await fetch('/api/send', {
        method:'POST',
        body:JSON.stringify({
            'email': email,
            'subject': subject,
            'text': text
        })
    });
}