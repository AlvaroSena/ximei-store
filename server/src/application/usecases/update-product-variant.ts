import { prisma } from "../../infra/prisma";
import { slugify } from "../../utils/slugify";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateProductVariantRequest {
  id: string;
  title: string;
  price: number;
}

export class UpdateProductVariant {
  async execute({ id, title, price }: UpdateProductVariantRequest) {
    const variant = await prisma.variant.findUnique({
      where: {
        id,
      },
    });

    if (!variant) {
      throw new ResourceNotFoundError("Variant not found");
    }

    await prisma.variant.update({
      where: {
        id,
      },
      data: {
        title,
        priceInCents: price * 100,
        slug: slugify(title),
      },
    });

    return {
      variantId: variant.id,
    };
  }
}
