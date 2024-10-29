/*
  Warnings:

  - A unique constraint covering the columns `[referral_code]` on the table `User_Referral` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referral_code` to the `User_Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_token` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "techevent"."User_Referral" ADD COLUMN     "referral_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "techevent"."Users" ADD COLUMN     "access_token" TEXT NOT NULL,
ALTER COLUMN "referral_use" DROP NOT NULL,
ALTER COLUMN "referral_use" SET DATA TYPE TEXT,
ALTER COLUMN "points" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "User_Referral_referral_code_key" ON "techevent"."User_Referral"("referral_code");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "techevent"."Users"("email");
