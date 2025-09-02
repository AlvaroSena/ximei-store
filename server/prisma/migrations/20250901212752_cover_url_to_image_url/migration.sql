/*
  Warnings:

  - You are about to drop the column `coverUrl` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."categories" DROP COLUMN "coverUrl",
ADD COLUMN     "imageUrl" TEXT;
