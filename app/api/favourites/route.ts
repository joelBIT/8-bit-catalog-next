import { NextResponse } from "next/server";
import { headers } from "next/headers";
import z from "zod";
import { addFavouriteForUserId, deleteFavouriteForUserId, getFavouritesByUserId } from "@/app/_db/favourites-db";
import { auth } from "@/app/auth";

const favouriteBody = z.object({ game_id: z.coerce.number().int().positive() });

async function getSession() {
    return auth.api.getSession({ headers: await headers() });
}

/**
 * Retrieves the authenticated user's favourite games.
 */
export async function GET(): Promise<NextResponse> {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized to access favourites' }, { status: 401 });
    }

    try {
        return NextResponse.json(await getFavouritesByUserId(session.user.id));
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Could not retrieve favourites' }, { status: 500 });
    }
}

/**
 * Adds a game to the authenticated user's list of favourite games.
 */
export async function POST(request: Request): Promise<NextResponse> {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized to access favourites' }, { status: 401 });
    }

    const result = await parseGameId(request);
    if ('error' in result) {
        return result.error;
    }

    try {
        await addFavouriteForUserId(session.user.id, result.gameId);
        return NextResponse.json({ message: 'Game added to favourites' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Could not add game to favourites' }, { status: 500 });
    }
}

/**
 * Deletes a game from the authenticated user's list of favourite games.
 */
export async function DELETE(request: Request): Promise<NextResponse> {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized to access favourites' }, { status: 401 });
    }

    const result = await parseGameId(request);
    if ('error' in result) {
        return result.error;
    }

    try {
        await deleteFavouriteForUserId(session.user.id, result.gameId);
        return NextResponse.json({ message: 'Game removed from favourites' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Could not remove game from favourites' }, { status: 500 });
    }
}

/**
 * Reads the request body once and validates it. Returns the game id, or a 400 response.
 */
async function parseGameId(request: Request): Promise<{ gameId: number } | { error: NextResponse }> {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return { error: NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 }) };
    }

    const parsed = favouriteBody.safeParse(body);
    if (!parsed.success) {
        console.log("Invalid favourites body:", body, parsed.error.issues);     // remove once it works
        return { error: NextResponse.json({ error: 'Invalid game_id', issues: parsed.error.issues }, { status: 400 }) };
    }

    return { gameId: parsed.data.game_id };
}