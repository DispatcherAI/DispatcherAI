/*
  Warnings:

  - You are about to drop the column `object` on the `CallAnalytics` table. All the data in the column will be lost.
  - The `sentiment` column on the `CallAnalytics` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CallAnalytics" DROP COLUMN "object",
ADD COLUMN     "recommendation" TEXT,
DROP COLUMN "sentiment",
ADD COLUMN     "sentiment" JSONB;
