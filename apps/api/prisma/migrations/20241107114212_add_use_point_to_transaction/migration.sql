/*
  Warnings:

  - You are about to drop the column `is_UsePoint` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `usePoint` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "techevent"."Transaction" DROP COLUMN "is_UsePoint",
ADD COLUMN     "usePoint" DOUBLE PRECISION NOT NULL;
