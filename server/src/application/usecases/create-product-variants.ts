import { prisma } from "../../infra/prisma";
import { slugify } from "../../utils/slugify";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

type Variant = {
  title: string;
  price: number;
};

interface CreateProductVariantsRequest {
  productId: string;
  variants: Variant[];
}

export class CreateProductVariants {
  async execute({ productId, variants }: CreateProductVariantsRequest) {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new ResourceNotFoundError("Product not found");
    }

    await Promise.all(
      variants.map(({ title, price }) =>
        prisma.variant.create({
          data: {
            title,
            productId,
            priceInCents: price * 100,
            slug: slugify(title),
          },
        })
      )
    );
  }
}
