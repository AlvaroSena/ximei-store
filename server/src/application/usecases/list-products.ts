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

    const cachedProducts = await redis.get(cacheKey);

    if (cachedProducts) {
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

    if (process.env.NODE_ENV === "production") {
      await redis.set(cacheKey, JSON.stringify(result), { ex: 60 });
    } else {
      await redis.setEx(cacheKey, 60, JSON.stringify(result));
    }

    return result;
  }
}
