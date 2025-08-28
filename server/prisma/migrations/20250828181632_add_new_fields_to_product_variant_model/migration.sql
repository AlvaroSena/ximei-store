/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `product_variants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `product_variants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."product_variants" ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_slug_key" ON "public"."product_variants"("slug");
