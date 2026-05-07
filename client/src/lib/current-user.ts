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
    const email =
        user.primaryEmailAddress?.emailAddress ??
        user.emailAddresses[0]?.emailAddress ??
        null;

    return normalizeEmailAddress(email);
}

function normalizeEmailAddress(value: string | null) {
    const normalizedValue = value?.trim().toLowerCase();

    return normalizedValue || null;
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

async function findUserByEmail(value: string | null) {
    if (!value) {
        return null;
    }

    const existingUsers = await db.$queryRaw<{ id: string }[]>
        `SELECT "id" FROM "User" WHERE LOWER("email") = ${value} LIMIT 1`;
    const existingUser = existingUsers[0];

    if (!existingUser) {
        return null;
    }

    return db.user.findUnique({
        where: { id: existingUser.id },
    });
}

async function syncUserEmail(userId: string, email: string | null) {
    if (!email) {
        return;
    }

    await db.$executeRaw`UPDATE "User" SET "email" = ${email} WHERE "id" = ${userId}`;
}

async function mergeUsersByEmail({
    canonicalUser,
    duplicateUser,
    clerkUserId,
    phoneNumber,
}: {
    canonicalUser: DbUser;
    duplicateUser: DbUser;
    clerkUserId: string;
    phoneNumber: string | null;
}) {
    const phoneNumberToKeep =
        canonicalUser.phoneNumber ?? duplicateUser.phoneNumber ?? phoneNumber;

    return db.$transaction(async (tx) => {
        await tx.call.updateMany({
            where: { userId: duplicateUser.id },
            data: { userId: canonicalUser.id },
        });

        await tx.user.update({
            where: { id: duplicateUser.id },
            data: {
                clerkUserId: null,
                phoneNumber: null,
            },
        });

        const updatedUser = await tx.user.update({
            where: { id: canonicalUser.id },
            data: {
                clerkUserId,
                ...(!canonicalUser.phoneNumber && phoneNumberToKeep
                    ? { phoneNumber: phoneNumberToKeep }
                    : {}),
            },
        });

        await tx.user.delete({
            where: { id: duplicateUser.id },
        });

        return updatedUser;
    });
}

export async function ensureDbUserForClerkUser(
    user: ClerkUser
): Promise<DbUser> {
    const clerkPhoneNumber = await getClaimablePhoneNumber(
        getClerkPhoneNumber(user),
        user.id
    );
    const clerkEmail = getClerkEmail(user);

    const dbUserByClerkId = await db.user.findUnique({
        where: { clerkUserId: user.id },
    });
    const dbUserByEmail = await findUserByEmail(clerkEmail);

    if (
        dbUserByClerkId &&
        dbUserByEmail &&
        dbUserByClerkId.id !== dbUserByEmail.id
    ) {
        return mergeUsersByEmail({
            canonicalUser: dbUserByEmail,
            duplicateUser: dbUserByClerkId,
            clerkUserId: user.id,
            phoneNumber: clerkPhoneNumber,
        });
    }

    const dbUser = dbUserByEmail ?? dbUserByClerkId;

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
    const updatedUser = await db.user.update({
        where: { id: dbUser.id },
        data: {
            clerkUserId: user.id,
            ...(shouldUpdatePhoneNumber
                ? { phoneNumber: clerkPhoneNumber }
                : {}),
        },
    });

    await syncUserEmail(updatedUser.id, clerkEmail);

    return updatedUser;
}
