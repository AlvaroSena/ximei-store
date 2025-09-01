/*
  Warnings:

  - You are about to drop the `variant_promotions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."variant_promotions" DROP CONSTRAINT "variant_promotions_variant_id_fkey";

-- DropTable
DROP TABLE "public"."variant_promotions";

-- CreateTable
CREATE TABLE "public"."offers" (
    "id" TEXT NOT NULL,
    "variant_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "min_qty" INTEGER NOT NULL,
    "price_in_cents" INTEGER NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."offers" ADD CONSTRAINT "offers_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
