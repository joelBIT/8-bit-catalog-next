import { isAuthenticatedAdmin } from "@/app/_session/utils";
import { updateCategoryFilter, updateDeveloperFilter, updatePublisherFilter } from "@/app/_db/db";
import { NextResponse } from "next/server";

/**
 * Updates the search filters (e.g., categories, publishers, developers). Only admin is allowed
 * to update the filter values.
 */
export async function PUT(request: Request) {
    const { values, filter } = await request.json();
    const isAuthenticated = await isAuthenticatedAdmin();

    if (isAuthenticated) {
        switch(filter) {        // Switch to the filter column to be updated in the database filter table
            case "categories":
                await updateCategoryFilter(values);
                break;
            case "publishers":
                await updatePublisherFilter(values);
                break;
            case "developers":
                await updateDeveloperFilter(values);
                break;
        }
    }

    return NextResponse.json(request);
}