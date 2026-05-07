import "server-only";

import { db } from "@/db";
import { normalizePhoneNumber } from "@/lib/phone";
import type { User as ClerkUser } from "@clerk/nextjs/server";
import type { User as DbUser } from "@prisma/client";

export function getClerkPhoneNumber(user: ClerkUser) {
    return normalizePhoneNumber(
        user.primaryPhoneNumber?.phoneNumber ??
            user.phoneNumbers[0]?.phoneNumber
    );
}

export function getClerkEmail(user: ClerkUser) {
    return (
        user.primaryEmailAddress?.emailAddress ??
        user.emailAddresses[0]?.emailAddress ??
        null
    );
}

async function getClaimablePhoneNumber(
    value: string | null,
    clerkUserId: string
) {
    if (!value) {
        return null;
    }

    const existingUser = await db.user.findFirst({
        where: { phoneNumber: value },
    });

    if (existingUser && existingUser.clerkUserId !== clerkUserId) {
        return null;
    }

    return value;
}

async function getClaimableEmail(value: string | null, clerkUserId: string) {
    if (!value) {
        return null;
    }

    const existingUsers = await db.$queryRaw<
        { id: string; clerkUserId: string | null }[]
    >`SELECT "id", "clerkUserId" FROM "User" WHERE "email" = ${value} LIMIT 1`;
    const existingUser = existingUsers[0];

    if (existingUser && existingUser.clerkUserId !== clerkUserId) {
        return null;
    }

    return value;
}

async function syncUserEmail(userId: string, email: string | null) {
    if (!email) {
        return;
    }

    await db.$executeRaw`UPDATE "User" SET "email" = ${email} WHERE "id" = ${userId}`;
}

export async function ensureDbUserForClerkUser(
    user: ClerkUser
): Promise<DbUser> {
    const clerkPhoneNumber = await getClaimablePhoneNumber(
        getClerkPhoneNumber(user),
        user.id
    );
    const clerkEmail = await getClaimableEmail(getClerkEmail(user), user.id);

    const dbUser = await db.user.findUnique({
        where: { clerkUserId: user.id },
    });

    if (!dbUser) {
        const createdUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                phoneNumber: clerkPhoneNumber,
            },
        });

        await syncUserEmail(createdUser.id, clerkEmail);

        return createdUser;
    }

    const shouldUpdatePhoneNumber = !dbUser.phoneNumber && clerkPhoneNumber;
    await syncUserEmail(dbUser.id, clerkEmail);

    if (shouldUpdatePhoneNumber) {
        return db.user.update({
            where: { id: dbUser.id },
            data: {
                phoneNumber: clerkPhoneNumber,
            },
        });
    }

    return dbUser;
}
