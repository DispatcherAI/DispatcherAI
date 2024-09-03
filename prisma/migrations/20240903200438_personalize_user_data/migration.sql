/*
  Warnings:

  - You are about to drop the column `userModel` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userPrompt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Call" ADD COLUMN     "waitTime" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userModel",
DROP COLUMN "userPrompt",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
