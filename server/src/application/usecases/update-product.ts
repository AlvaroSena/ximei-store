import { prisma } from "../../infra/prisma";
import { slugify } from "../../utils/slugify";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateProductRequest {
  id: string;
  title: string;
  description?: string;
  price: number;
  brand: string;
  categoryId: string;
}

export class UpdateProduct {
  async execute({
    id,
    title,
    description,
    price,
    brand,
    categoryId,
  }: UpdateProductRequest) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new ResourceNotFoundError("Product not found");
    }

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        priceInCents: price * 100,
        brand,
        slug: slugify(title),
        categoryId,
      },
    });
  }
}
