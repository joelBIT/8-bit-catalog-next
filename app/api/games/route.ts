import { NextRequest, NextResponse } from "next/server";
import { getGamesBySearchFilters } from "@/db/db";
import { SearchFilter } from "@/types/types";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const filters: SearchFilter = {
        title: searchParams.get('title') as string,
        category: convertFilterAll(searchParams.get('category') as string),
        developer: convertFilterAll(searchParams.get('developer') as string),
        publisher: convertFilterAll(searchParams.get('publisher') as string),
        page: searchParams.get('page') as string
    }

    const games = await getGamesBySearchFilters(filters);
    return NextResponse.json(games);
}

function convertFilterAll(value: string) {
    return value === 'All' ? '%' : value;
}