import { NextResponse } from "next/server";
import { getGameById } from "@/app/_db/db";

/**
 * Retrieve the game which corresponds to the supplied  game id.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("id");

    if (!gameId || !parseInt(gameId)) {
        return NextResponse.json({ message: "Supplied id is not a valid id" }, { status: 400 });
    } else {
        const game = await getGameById(parseInt(gameId));
        return NextResponse.json(game);
    }
}
