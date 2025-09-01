/*
  Warnings:

  - The `attribute_value` column on the `variant_attributes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."variant_attributes" DROP COLUMN "attribute_value",
ADD COLUMN     "attribute_value" TEXT[];
