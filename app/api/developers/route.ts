import { NextResponse } from "next/server";
import { getAllDevelopers } from "@/db/db";

export async function GET() {
    try {
        const developers = await getAllDevelopers();
        return NextResponse.json(developers);
    } catch (error) {
        console.log(error);
    }

    return NextResponse.json({ error: true, message: "Could not retrieve developers" }, { status: 500 });
}
