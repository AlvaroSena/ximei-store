/*
  Warnings:

  - You are about to drop the `variant_prices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."variant_prices" DROP CONSTRAINT "variant_prices_variant_id_fkey";

-- DropTable
DROP TABLE "public"."variant_prices";

-- CreateTable
CREATE TABLE "public"."variant_promotions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "variant_id" TEXT NOT NULL,
    "min_qty" INTEGER NOT NULL,
    "price_in_cents" INTEGER NOT NULL,

    CONSTRAINT "variant_promotions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."variant_promotions" ADD CONSTRAINT "variant_promotions_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
