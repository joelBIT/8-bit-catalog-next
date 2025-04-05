import { NextResponse } from "next/server";
import { addFavouriteForUserId, deleteFavouriteForUserId, getFavouritesByUserId } from "@/db/db";
import { getValidatedSession } from "@/auth/cookie";

export async function GET() {
    const session = await getValidatedSession();

    if (session) {
        const games = await getFavouritesByUserId(session.user_id);
        return NextResponse.json(games);
    }

    return NextResponse.json([]);
}

export async function POST(request: Request) {
    const { game_id } = await request.json();
    const session = await getValidatedSession();

    if (session) {
        await addFavouriteForUserId(session.user_id, game_id);
    }

    return NextResponse.json(request);
}

export async function DELETE(request: Request) {
    const { game_id } = await request.json();
    const session = await getValidatedSession();

    if (session) {
        await deleteFavouriteForUserId(session.user_id, game_id);
    }

    return NextResponse.json(request);
}