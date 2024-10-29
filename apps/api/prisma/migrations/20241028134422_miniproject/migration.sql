/*
  Warnings:

  - A unique constraint covering the columns `[referral_code]` on the table `User_Referral` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userReferralId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referral_code` to the `User_Referral` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE "techevent".user_referral_user_referral_id_seq;
ALTER TABLE "techevent"."User_Referral" ADD COLUMN     "referral_code" TEXT NOT NULL,
ALTER COLUMN "user_referral_id" SET DEFAULT nextval('"techevent".user_referral_user_referral_id_seq');
ALTER SEQUENCE "techevent".user_referral_user_referral_id_seq OWNED BY "techevent"."User_Referral"."user_referral_id";

-- AlterTable
ALTER TABLE "techevent"."Users" ADD COLUMN     "refresh_token" TEXT,
ALTER COLUMN "referral_use" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_Referral_referral_code_key" ON "techevent"."User_Referral"("referral_code");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userReferralId_key" ON "techevent"."Users"("userReferralId");
