import { prisma } from "../../infra/prisma";
import redis from "../../infra/redis/local";

interface ListProductsRequest {
  page: number;
  perPage: number;
}

export class ListProductsLocal {
  async execute({ page, perPage }: ListProductsRequest) {
    const skip = (page - 1) * perPage;
    const take = perPage;

    const cacheKey = `products:page:${page}:perPage:${perPage}`;

    console.log(cacheKey);

    const cachedProducts = await redis.get(cacheKey);

    if (cachedProducts) {
      console.log("DEV: cache hit");
      return JSON.parse(cachedProducts);
    }

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

    const result = {
      products,
      totalProducts,
      totalPages,
      currentPage: page,
    };

    await redis.setEx(cacheKey, 24 * 60 * 60, JSON.stringify(result)); // 24 hour

    console.log("DEV: not cache");

    return result;
  }
}
