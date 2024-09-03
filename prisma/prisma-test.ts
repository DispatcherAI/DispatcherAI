import { statusType, callType, severityType } from "@prisma/client";
import { id } from "date-fns/locale";
import { create } from "domain";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
/**
 * Generate a unique email address
 */
function generateUniqueEmail() {
    const randomId = Math.random().toString(36).substring(2 ,8); // creates a substring of the random number from 2 to 8
    return `user_${randomId}@dispatch.ai`
}
//* test API requests to the call and user models
async function main() {
  try {
    /**
     * Create a new user
     */

    console.log("Creating a new user...");
    const newUser = await prisma.user.create({
      data: {
        name: "John Doe",
        email: generateUniqueEmail(),
        phone: "1234567890",
      },
    });
    console.log("New user created with ID:", newUser.id);
    console.log("New user created:", newUser);

    /**
     * Create a new call
     */
    console.log("Retrieving all calls...");
    const calls = await prisma.call.create({
      data: {
        type: "Fire" as callType,
        severity: "Medium" as severityType,
        status: "Active" as statusType,
        createdAt: "2021-10-10T09:00:00Z", // placeholder date and time
        endedAt: "2021-10-10T10:00:00Z", // placeholder date and time
        duration: 60, // placeholder for duration
        waitTime: 10, // placeholder for wait time
        user: {
            connect: { id: newUser.id }, // connect the call to the new user
        }
      },
    });
    console.log("Calls:", calls);
  } catch (error) {
    console.error("Error creating new user:", error);
  } finally {
    await prisma.$disconnect(); // disconnect the client
  }
}

main();
