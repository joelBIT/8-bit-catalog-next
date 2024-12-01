import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
    return createBrowserClient(
        testUrl(),
        testKey()
    )

    function testUrl() {
        console.log(process.env.NEXT_PUBLIC_SUPABASE_URL as string);
        return process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    }

    function testKey() {
        console.log(process.env.NEXT_PUBLIC_SUPABASE_KEY as string);
        return process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
    }
}