import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const clerkUserId = searchParams.get("clerkUserId");

    if (!clerkUserId) {
        return NextResponse.json(
            { error: "clerkUserId is required." },
            { status: 400 },
        );
    }

    try {
        const user = await db.user.findUnique({
            where: { clerkUserId },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found." },
                { status: 404 },
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Failed to fetch user." },
            { status: 500 },
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const { clerkUserId, userModel, userPrompt } = await request.json();

        if (!clerkUserId || (!userModel && !userPrompt)) {
            return NextResponse.json(
                {
                    error: "clerkUserId, userModel, and/or userPrompt are required.",
                },
                { status: 400 },
            );
        }

        const updatedUser = await db.user.update({
            where: { clerkUserId },
            data: {
                userModel,
                userPrompt,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { error: "Failed to update user." },
            { status: 500 },
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { clerkUserId } = await request.json();
        
        if (!clerkUserId) {
            return NextResponse.json({
                error: "clerkUserId is required."},
                {status: 400},
            );
        }

        const deletedUser = await db.user.delete({
            where: { clerkUserId },
        });
        
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json(
            { error: "Failed to delete user." },
            { status: 500 },
        );
    }
}
