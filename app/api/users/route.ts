import { NextResponse } from "next/server";
import { getAllUsers } from "@/db/db";

export async function GET() {
    const users = await getAllUsers();
    return NextResponse.json(users);
}