import { isAuthenticatedAdmin } from "@/app/_session/utils";
import { updateCategoryFilter } from "@/db/db";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const { values, filter } = await request.json();
    const isAuthenticated = await isAuthenticatedAdmin();

    if (isAuthenticated) {
        switch(filter) {
            case "categories":
                await updateCategoryFilter(values);
                break;
        }
        
    }

    return NextResponse.json(request);
}