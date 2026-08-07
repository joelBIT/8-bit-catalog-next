import { NextResponse } from "next/server";
import { getAllCategories, getAllDevelopers, getAllPublishers } from "@/app/_db/games-db";

/**
 * Retrieve all filter values.
 */
export async function GET(): Promise<NextResponse> {
    try {
        const filterValues = {categories: [] as string[], developers: [] as string[], publishers: [] as string[]};
        const categories = await getAllCategories();
        const publishers = await getAllPublishers();
        const developers = await getAllDevelopers();
        filterValues.categories.push(...categories);
        filterValues.publishers.push(...publishers);
        filterValues.developers.push(...developers);

        return NextResponse.json(filterValues);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Could not retrieve filter values' }, { status: 500 });
    }
}