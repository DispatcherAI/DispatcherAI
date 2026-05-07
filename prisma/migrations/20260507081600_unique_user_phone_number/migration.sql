-- DropIndex
DROP INDEX IF EXISTS "User_phoneNumber_idx";

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "User_phoneNumber_key" ON "User"("phoneNumber");
