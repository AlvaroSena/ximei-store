import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreateVariantPromotionRequest {
  variantId: string;
  title: string;
  minQty: number;
  price: number;
}

export class CreateVariantPromotion {
  async execute({
    variantId,
    title,
    minQty,
    price,
  }: CreateVariantPromotionRequest) {
    const variant = await prisma.productVariant.findUnique({
      where: {
        id: variantId,
      },
    });

    if (!variant) {
      throw new ResourceNotFoundError("Variant not found");
    }

    const promotion = await prisma.variantPromotion.create({
      data: {
        variantId,
        title,
        minQty,
        priceInCents: price * 100,
      },
    });

    return {
      promotionId: promotion.id,
    };
  }
}
