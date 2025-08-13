import { prisma } from "../../infra/prisma";

interface ListProductsRequest {
  page: number;
  perPage: number;
}

export class ListProducts {
  async execute({ page, perPage }: ListProductsRequest) {
    const skip = (page - 1) * perPage;
    const take = perPage;

    const [products, totalProducts] = await Promise.all([
      prisma.product.findMany({
        skip,
        take,
        include: {
          images: true,
        },
      }),
      prisma.product.count(),
    ]);

    const totalPages = Math.ceil(totalProducts / perPage);

    return {
      products,
      totalProducts,
      totalPages,
      currentPage: page,
    };
  }
}
