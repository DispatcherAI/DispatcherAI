import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url); // parses the URL to get the search parameters
    const callID = searchParams.get("id");
    const userId = searchParams.get("userId");

    try {
        if (callID) {
            // Fetch specific call by ID
            const call = await db.call.findFirst({
                where: {
                    id: callID,
                    ...(userId ? { userId } : {}),
                },
                include: {
                    callAnalytics: true,
                    user: true,
                },
            });

            if (!call) {
                return NextResponse.json(
                    { error: "Call not found." },
                    { status: 404 },
                );
            }

            return NextResponse.json(call, { status: 200 });
        } else {
            // Fetch scoped dashboard calls when userId is provided.
            const calls = await db.call.findMany({
                where: userId ? { userId } : undefined,
                include: {
                    callAnalytics: true,
                    user: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            return NextResponse.json(calls, { status: 200 });
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
        const { type, severity, status, userID } = await request.json();

        const user = await db.user.findUnique({
            where: { id: userID },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found." },
                { status: 404 },
            );
        }

        const newCall = await db.call.create({
            data: {
                status,
                userId: user.id, // associate the call with the user
                callAnalytics:
                    type || severity
                        ? {
                              create: {
                                  type,
                                  severity,
                              },
                          }
                        : undefined,
            },
            include: {
                callAnalytics: true,
                user: true,
            },
        });

        return NextResponse.json(newCall, { status: 201 });
    } catch (error) {
        console.error("Error creating call:", error);
        return NextResponse.json(
            { error: "Failed to create call." },
            { status: 500 },
        );
    }
}
