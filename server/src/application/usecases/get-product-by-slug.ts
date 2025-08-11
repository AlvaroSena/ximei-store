import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetProductRequest {
  slug: string;
}

export class GetProductBySlug {
  async execute({ slug }: GetProductRequest) {
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        images: true,
      },
    });

    if (!product) {
      throw new ResourceNotFoundError("Product not found");
    }

    return {
      product,
    };
  }
}
