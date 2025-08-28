-- DropForeignKey
ALTER TABLE "public"."variant_promotions" DROP CONSTRAINT "variant_promotions_variant_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."variant_promotions" ADD CONSTRAINT "variant_promotions_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
