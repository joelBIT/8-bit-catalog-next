import { NextResponse } from "next/server";
import { getGames } from "@/db/db";

export async function GET() {
    const { data } = await getGames();
    return NextResponse.json(data);
}
