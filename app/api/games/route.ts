import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(databaseURL(), databaseKey());

function databaseURL() {
    return process.env.SUPABASE_URL ? process.env.SUPABASE_URL : "";
}

function databaseKey() {
    return process.env.SUPABASE_KEY ? process.env.SUPABASE_KEY : "";
}

export async function GET() {
    const { data, error } = await supabase.from('games').select();

    return NextResponse.json(data);
}
