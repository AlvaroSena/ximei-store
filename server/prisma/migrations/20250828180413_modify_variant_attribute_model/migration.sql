-- AlterTable
ALTER TABLE "public"."variant_attributes" ALTER COLUMN "attribute_value" SET NOT NULL,
ALTER COLUMN "attribute_value" SET DATA TYPE TEXT;
