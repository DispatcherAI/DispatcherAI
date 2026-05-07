import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { ensureDbUserForClerkUser } from "@/lib/current-user";
import { isValidPhoneNumber, normalizePhoneNumber } from "@/lib/phone";
import { currentUser } from "@clerk/nextjs/server";

export async function PATCH(request: NextRequest) {
    const clerkUser = await currentUser();

    if (!clerkUser) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    try {
        const { phoneNumber } = await request.json();
        const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);

        if (!isValidPhoneNumber(normalizedPhoneNumber)) {
            return NextResponse.json(
                { error: "Enter a valid phone number." },
                { status: 400 }
            );
        }

        const existingUser = await db.user.findFirst({
            where: { phoneNumber: normalizedPhoneNumber },
        });

        if (existingUser && existingUser.clerkUserId !== clerkUser.id) {
            return NextResponse.json(
                { error: "That phone number is already registered." },
                { status: 409 }
            );
        }

        const dbUser = await ensureDbUserForClerkUser(clerkUser);
        const updatedUser = await db.user.update({
            where: { id: dbUser.id },
            data: { phoneNumber: normalizedPhoneNumber },
        });

        return NextResponse.json({
            phoneNumber: updatedUser.phoneNumber,
        });
    } catch (error) {
        console.error("Error updating phone number:", error);

        return NextResponse.json(
            { error: "Failed to update phone number." },
            { status: 500 }
        );
    }
}
