import { NextRequest, NextResponse } from "next/server";
import { getGamesBySearchFilters } from "@/db/db";
import { SearchFilter } from "@/types/types";

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

    const games = await getGamesBySearchFilters(filters);
    return NextResponse.json(games);
}