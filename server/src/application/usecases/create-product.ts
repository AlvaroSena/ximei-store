import { prisma } from "../../infra/prisma";
import { slugify } from "../../utils/slugify";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

type Variant = {
  title: string;
  price: number;
};

interface CreateProductRequest {
  title: string;
  description?: string;
  price: number;
  brand: string;
  categoryId: string;
  variants: Variant[];
}

interface CreateProductResponse {
  productId: string;
}

export class CreateProduct {
  async execute({
    title,
    description,
    price,
    brand,
    categoryId,
    variants,
  }: CreateProductRequest): Promise<CreateProductResponse> {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new ResourceNotFoundError("Category not found");
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        priceInCents: price * 100,
        brand,
        slug: slugify(title),
        categoryId: category.id,
      },
    });

    await Promise.all(
      variants.map(({ title, price }) =>
        prisma.variant.create({
          data: {
            title,
            productId: product.id,
            priceInCents: price * 100,
            slug: slugify(title),
          },
        })
      )
    );

    return {
      productId: product.id,
    };
  }
}
