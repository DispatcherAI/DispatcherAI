import { NextResponse } from "next/server";
import { db } from "@/db";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser, User } from "@clerk/nextjs/server";

const MAX_RETRIES = 3;
async function createUser(user: User, retries = 0) {
    try {
        const dbUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name: user.fullName ?? "",
                email: user.emailAddresses[0].emailAddress,
            },
        });

        return dbUser;
    } catch (error) {
        if (retries < MAX_RETRIES) {
            return await createUser(user, retries + 1);
        } else {
            throw new Error("User creation failed after multiple retries");
        }
    }
}

export async function GET() {
    const { userId } = auth();

    console.log("userId", userId);

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await currentUser();
    if (!user) {
        return new NextResponse("User not exist", { status: 404 });
    }

    let dbUser = await db.user.findUnique({
        where: { clerkUserId: user.id },
    });

    if (!dbUser) {
        try {
            dbUser = await createUser(user);
        } catch (error) {
            return new NextResponse("Failed to create user", { status: 500 });
        }
    }

    if (!dbUser) {
        return new NextResponse("Failed to create user", { status: 500 });
    }

    return new NextResponse(null, {
        status: 302,
        headers: {
            Location: absoluteUrl("/live"),
        },
    });
}
