import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url); // parses the URL to get the search parameters
    const callID = searchParams.get("id");

    if (!callID) {
        return NextResponse.json(
            { error: "callID is required." },
            { status: 400 }, // 400 indicates bad request
        );
        
    }

    try {
        const call = await db.call.findUnique({ // finds a unique call by the callID
            where: { id: callID },
            include: { User: true }
        });

        if (!call) {
            return NextResponse.json(
                { error: "Call not found." },
                { status: 404 }, // 404 indicated requested item not found
            );
        }
        
    } catch (error) {
        console.error("Error fetching call:", error);
        return NextResponse.json(
            { error: "Failed to fetch call." },
            { status: 500 },
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // pass the call-specific information
        const { type, severity, status, userID }  = await request.json();

        const user = await db.user.findUnique({
            where: { id: userID }
        })

        if (!user) {
            return NextResponse.json(
                { error: "User not found." },
                { status: 404 },
            );
        }

        const newCall = await db.call.create({
            data: {
                type,
                severity,
                status,
                userId: user.id, // associate the call with the user
            }
        });



    } catch (error) {
        console.error("Error creating call:", error);
        return NextResponse.json(
            { error: "Failed to create call." },
            { status: 500 },
        );
    }
}