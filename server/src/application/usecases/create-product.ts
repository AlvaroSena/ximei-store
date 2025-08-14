import { prisma } from "../../infra/prisma";
import { slugify } from "../../utils/slugify";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreateProductRequest {
  title: string;
  description?: string;
  price: number;
  brand: string;
  categoryId: string;
}

export class CreateProduct {
  async execute({
    title,
    description,
    price,
    brand,
    categoryId,
  }: CreateProductRequest) {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new ResourceNotFoundError("Category not found");
    }

    await prisma.product.create({
      data: {
        title,
        description,
        priceInCents: price * 100,
        brand,
        slug: slugify(title),
        categoryId: category.id,
      },
    });
  }
}
