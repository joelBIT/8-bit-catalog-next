import { NextResponse } from "next/server";
import { getGames } from "@/db/db";

export async function GET() {
    const games = await getGames();
    return NextResponse.json(games);
}
