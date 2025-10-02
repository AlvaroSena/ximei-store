-- CreateTable
CREATE TABLE "public"."orders" (
    "id" TEXT NOT NULL,
    "items" TEXT NOT NULL,
    "total_in_cents" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
