/*
  Warnings:

  - You are about to drop the `offers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."offers" DROP CONSTRAINT "offers_variant_id_fkey";

-- AlterTable
ALTER TABLE "public"."variants" ADD COLUMN     "base_price_in_cents" INTEGER,
ADD COLUMN     "isAnOffer" BOOLEAN;

-- DropTable
DROP TABLE "public"."offers";
