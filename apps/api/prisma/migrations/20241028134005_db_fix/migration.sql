/*
  Warnings:

  - A unique constraint covering the columns `[userReferralId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_userReferralId_key" ON "techevent"."Users"("userReferralId");
