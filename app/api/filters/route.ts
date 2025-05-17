import { NextResponse } from "next/server";
import { getFilterValues } from "@/app/_db/db";

/**
 * Returns all existing developers, publishers, and categories. An empty array is returned if an error occurs.
 */
export async function GET() {
    try {
        const filterValues = await getFilterValues();
        return NextResponse.json(filterValues);
    } catch (error) {
        console.log(error);
        return NextResponse.json([]);
    }
}