import { prisma } from "../../infra/prisma";
import redis from "../../infra/redis";

interface ListProductsRequest {
  page: number;
  perPage: number;
}

export class ListProducts {
  async execute({ page, perPage }: ListProductsRequest) {
    const skip = (page - 1) * perPage;
    const take = perPage;

    const cacheKey = `products:page:${page}:perPage:${perPage}`;

    console.log(cacheKey);

    const cachedProducts = await redis.get(cacheKey);

    if (cachedProducts) {
      return cachedProducts;
    }

    const [products, totalProducts] = await Promise.all([
      prisma.product.findMany({
        skip,
        take,
      }),
      prisma.product.count(),
    ]);

    const totalPages = Math.ceil(totalProducts / perPage);

    const result = {
      products,
      totalProducts,
      totalPages,
      currentPage: page,
    };

    await redis.set(cacheKey, JSON.stringify(result), { ex: 24 * 60 * 60 }); // 24 hour

    return result;
  }
}
