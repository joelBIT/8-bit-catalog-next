import { NextResponse } from "next/server";
import { addFavouriteForUserId, deleteFavouriteForUserId, getFavouritesByUserId } from "@/app/_db/db";
import { getValidatedSession } from "@/app/_session/cookie";

/**
 * Retrieves the authenticated user's favourite games. Returns an empty array if user is not authenticated.
 */
export async function GET() {
    const session = await getValidatedSession();

    if (session) {
        const games = await getFavouritesByUserId(session.user_id);
        return NextResponse.json(games);
    }

    return NextResponse.json([]);
}

/**
 * Adds a game to the authenticated user's list of favourite games. Nothing happens if no session exist.
 */
export async function POST(request: Request) {
    const { game_id } = await request.json();
    const session = await getValidatedSession();

    if (session) {
        await addFavouriteForUserId(session.user_id, game_id);
    }

    return NextResponse.json(request);
}

/**
 * Deletes a game from the authenticated user's list of favourite games. Nothing happens if no session exist.
 */
export async function DELETE(request: Request) {
    const { game_id } = await request.json();
    const session = await getValidatedSession();

    if (session) {
        await deleteFavouriteForUserId(session.user_id, game_id);
    }

    return NextResponse.json(request);
}