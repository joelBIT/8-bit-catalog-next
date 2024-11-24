import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(databaseURL(), databaseKey());

function databaseURL() {
    return process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : "";
}

function databaseKey() {
    return process.env.NEXT_PUBLIC_SUPABASE_KEY ? process.env.NEXT_PUBLIC_SUPABASE_KEY : "";
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("id");

    if (!gameId || !parseInt(gameId)) {
        return NextResponse.json({ error: false, message: "Supplied id is not a valid id" }, { status: 400 });
    } else {
        const { data } = await supabase.from('games').select().eq('id', gameId).single();
        return NextResponse.json(data);
    }
}
