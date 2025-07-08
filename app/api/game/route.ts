import { NextResponse } from "next/server";
import { getGameByTitle, getGameById } from "@/app/_db/db";

/**
 * Retrieve the game which corresponds to the supplied game id (or title).
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("id");
    const gameTitle = searchParams.get("title");

    if (gameTitle) {
        try {
            const title = await getGameByTitle(gameTitle);
            return NextResponse.json(title);
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: `Could not retrieve game ${gameTitle}` }, { status: 500 });
        }
    }

    if (!gameId || !parseInt(gameId)) {
        return NextResponse.json({ message: "Supplied id is not a valid id" }, { status: 400 });
    } else {
        try {
            const game = await getGameById(parseInt(gameId));
            return NextResponse.json(game);
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: 'Could not retrieve game' }, { status: 500 });
        }
    }
}
