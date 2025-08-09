import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteProductRequest {
  id: string;
}

export class DeleteProduct {
  async execute({ id }: DeleteProductRequest) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new ResourceNotFoundError("Product not found");
    }

    await prisma.product.delete({
      where: {
        id: product.id,
      },
    });
  }
}
