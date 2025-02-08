import { NextResponse } from "next/server";
import { getAllPublishers } from "@/db/db";

export async function GET() {
    const publishers = await getAllPublishers();
    return NextResponse.json(publishers);
}
