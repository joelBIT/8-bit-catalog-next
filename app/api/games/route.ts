import { getAllGamesRequest } from "@/app/_db/games-db";
import { NextResponse } from "next/server";

/**
 * Retrieve all games.
 */
export async function GET(): Promise<NextResponse> {
    try {
        const games = await getAllGamesRequest();
        return NextResponse.json(games);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Could not retrieve games' }, { status: 500 });
    }
}