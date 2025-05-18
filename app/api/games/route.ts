import { NextRequest, NextResponse } from "next/server";
import { getGamesBySearchFilters } from "@/app/_db/db";
import { SearchFilter } from "@/app/_types/types";

/**
 * Retrieve games that match the supplied search filters.
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const filters: SearchFilter = {
        title: searchParams.get('title') as string,
        category: searchParams.get('category') as string,
        developer: searchParams.get('developer') as string,
        publisher: searchParams.get('publisher') as string,
        page: searchParams.get('page') as string
    }

    try {
        const games = await getGamesBySearchFilters(filters);
        return NextResponse.json(games);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Could not retrieve games' }, { status: 500 });
    }
}