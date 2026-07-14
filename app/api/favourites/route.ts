import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { addFavouriteForUserId, deleteFavouriteForUserId, getFavouritesByUserId } from "@/app/_db/favourites-db";
import { auth } from "@/app/auth";

/**
 * Retrieves the authenticated user's favourite games.
 */
export async function GET(): Promise<NextResponse> {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session) {
        const games = await getFavouritesByUserId(session.user.id);
        return NextResponse.json(games);
    }

    return NextResponse.json({ error: 'Unauthorized to access favourites' }, { status: 401 });
}

/**
 * Adds a game to the authenticated user's list of favourite games.
 */
export async function POST(request: Request): Promise<NextResponse> {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session) {
        try {
            const { game_id } = await request.json();
            await addFavouriteForUserId(session.user.id, game_id);
            return NextResponse.json({ message: 'Game added to favourites' }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: 'Could not add game to favourites' }, { status: 500 });
        }
    }

    return NextResponse.json({ error: 'Unauthorized to add game to favourites' }, { status: 401 });
}

/**
 * Deletes a game from the authenticated user's list of favourite games.
 */
export async function DELETE(request: Request): Promise<NextResponse> {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session) {
        try {
            const { game_id } = await request.json();
            await deleteFavouriteForUserId(session.user.id, game_id);
            return NextResponse.json({ message: 'Game removed from favourites' }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: 'Could not remove game from favourites' }, { status: 500 });
        }
        
    }

    return NextResponse.json({ error: 'Unauthorized to remove game from favourites' }, { status: 401 });
}