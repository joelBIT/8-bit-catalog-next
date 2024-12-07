import { createBrowserClient } from '@supabase/ssr';

export function createAuthClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_KEY as string
    )
}