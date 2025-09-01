import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface ListProductVariantsRequest {
  productId: string;
}

export class ListProductVariants {
  async execute({ productId }: ListProductVariantsRequest) {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        variants: true,
      },
    });

    if (!product) {
      throw new ResourceNotFoundError("Product not found");
    }

    return {
      variants: product.variants,
    };
  }
}
