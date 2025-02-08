import { NextResponse } from "next/server";
import { getAllPublishers } from "@/db/db";

export async function GET() {
    try {
        const publishers = await getAllPublishers();
        return NextResponse.json(publishers);
    } catch (error) {
        console.log(error);
    }

    return NextResponse.json({ error: true, message: "Could not retrieve publishers" }, { status: 500 });
}
