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
        try {
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
                default:
                    return NextResponse.json({ error: `Filter ${filter} does not exist` }, { status: 400 });
            }
            
            return NextResponse.json({ message: 'Filter updated' }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: 'Could not update filter' }, { status: 500 });
        }
    }

    return NextResponse.json({ error: 'Unauthorized to update filters' }, { status: 401 });
}