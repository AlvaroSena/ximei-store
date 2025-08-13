import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface SearchProductProps {
  query: string;
}

export class SearchProduct {
  async execute({ query }: SearchProductProps) {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: {
        images: true,
      },
      take: 25,
      orderBy: { title: "asc" },
    });

    return {
      products,
    };
  }
}
