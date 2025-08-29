import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreateOfferRequest {
  variantId: string;
  title: string;
  minQty: number;
  price: number;
}

export class CreateOffer {
  async execute({ variantId, title, minQty, price }: CreateOfferRequest) {
    const variant = await prisma.variant.findUnique({
      where: {
        id: variantId,
      },
    });

    if (!variant) {
      throw new ResourceNotFoundError("Variant not found");
    }

    const promotion = await prisma.offer.create({
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
