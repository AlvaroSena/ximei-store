import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetProductRequest {
  id: string;
}

export class GetProduct {
  async execute({ id }: GetProductRequest) {
    const product = await prisma.product.findUnique({
      where: {
        id,
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
