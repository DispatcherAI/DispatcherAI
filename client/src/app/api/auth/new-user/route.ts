import { NextResponse } from "next/server";
import { ensureDbUserForClerkUser } from "@/lib/current-user";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET() {
    const { userId } = await auth();

    console.log("userId", userId);

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await currentUser();
    if (!user) {
        return new NextResponse("User not exist", { status: 404 });
    }

    const dbUser = await ensureDbUserForClerkUser(user);

    if (!dbUser) {
        return new NextResponse("Failed to create user", { status: 500 });
    }

    const nextPath = dbUser.phoneNumber ? "/live" : "/settings?required=phone";

    return new NextResponse(null, {
        status: 302,
        headers: {
            Location: absoluteUrl(nextPath),
        },
    });
}
