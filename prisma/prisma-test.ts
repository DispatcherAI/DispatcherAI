import { statusType, callType, severityType } from "@prisma/client";
import { id } from "date-fns/locale";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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
        // email: "Johndoe2@dispatch.ai",
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
