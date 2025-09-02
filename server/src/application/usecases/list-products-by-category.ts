import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface ListProductsByCategoryRequest {
  page: number;
  perPage: number;
  categorySlug: string;
}

export class ListProductsByCategory {
  async execute({
    page,
    perPage,
    categorySlug,
  }: ListProductsByCategoryRequest) {
    const skip = (page - 1) * perPage;
    const take = perPage;

    const category = await prisma.category.findUnique({
      where: {
        slug: categorySlug,
      },
    });

    if (!category) {
      throw new ResourceNotFoundError("Category not found");
    }

    const [products, totalProducts] = await Promise.all([
      prisma.product.findMany({
        where: {
          categoryId: category.id,
        },
        skip,
        take,
        orderBy: { title: "asc" },
      }),
      prisma.product.count({
        where: {
          categoryId: category.id,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalProducts / perPage);

    const result = {
      category,
      products,
      totalProducts,
      totalPages,
      currentPage: page,
    };

    return result;
  }
}
