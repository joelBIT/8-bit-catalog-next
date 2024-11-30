import { NextResponse } from "next/server";
import { getGameById } from "@/db/db";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("id");

    if (!gameId || !parseInt(gameId)) {
        return NextResponse.json({ error: false, message: "Supplied id is not a valid id" }, { status: 400 });
    } else {
        const { data } = await getGameById(parseInt(gameId));
        return NextResponse.json(data);
    }
}
