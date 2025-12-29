import { NextResponse } from "next/server";
import { getAllGames } from "@/app/_db/games-db";

/**
 * Retrieve all games.
 */
export async function GET(): Promise<NextResponse> {
    try {
        const games = await getAllGames();
        return NextResponse.json(games);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Could not retrieve games' }, { status: 500 });
    }
}