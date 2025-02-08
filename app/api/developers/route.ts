import { NextResponse } from "next/server";
import { getAllDevelopers } from "@/db/db";

export async function GET() {
    const developers = await getAllDevelopers();
    return NextResponse.json(developers);
}
