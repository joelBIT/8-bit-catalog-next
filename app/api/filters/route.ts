import { NextResponse } from "next/server";
import { getFilterValues } from "@/db/db";

export async function GET() {
    try {
        const filterValues = await getFilterValues();
        return NextResponse.json(filterValues);
    } catch (error) {
        console.log(error);
        return NextResponse.json([]);
    }
}