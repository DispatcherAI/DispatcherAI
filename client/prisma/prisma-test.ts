import { statusType, callType, severityType } from "@prisma/client";
import { db } from "@/db";
/**
 * Generate a unique email address
 */
function generateUniqueEmail() {
  const randomId = Math.random().toString(36).substring(2, 8); // creates a substring of the random number from 2 to 8
  return `user_${randomId}@dispatch.ai`;
}
//* test API requests to the call and user models
async function main() {
  /**
   * Create a new user
   */
  console.log("Creating a new user...");
  const newUser = await db.user.create({
    data: {
      name: "John Doe",
      email: generateUniqueEmail(),
      phone: "1234567890",
    },
  });
  console.log("New user created with ID:", newUser.id);
  console.log("New user created:", newUser);
  try {
    /**
     * Create a new call
     */
    console.log("Retrieving all calls...");
    const calls = await db.call.create({
      data: {
        type: "Fire" as callType,
        severity: "Medium" as severityType,
        status: "Active" as statusType,
        createdAt: "2021-10-10T09:00:00Z", // placeholder date and time
        endedAt: "2021-10-10T10:00:00Z", // placeholder date and time
        duration: 60, // placeholder for duration
        waitTime: 10, // placeholder for wait time
        users: {
          connect: { id: newUser.id }, // connect the call to the new user
        },
      },
    });
    console.log("Calls:", calls);

    /**
     * Retrieve all users and call data
     */
    console.log("Retrieving all users...");
    const findUser = await db.user.findMany({
      include: { calls: true }, // include calls related to the user in the query response
    });
    console.log("Users:", findUser);

    console.log("Retrieving all calls...");
    const findCalls = await db.call.findMany({
      include: { users: true }, // include user related to the call in the query response
    });
    console.log("Calls:", findCalls);
  } catch (error) {
    console.error("Error creating new user:", error);

    /**
     * Update users
     */
    console.log("Updating user...");
    const updatedUser = await db.user.update({
      where: { id: newUser.id },
      data: {
        name: "Jane Doe",
        email: generateUniqueEmail(),
        phone: "0987654321",
      },
    });
    console.log("Updated user:", updatedUser);
  } finally {
    await db.$disconnect(); // disconnect the client
  }

}

main();