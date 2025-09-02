import { prisma } from "../../infra/prisma";

export class ListFeaturedCategories {
  async execute() {
    const categories = await prisma.category.findMany({
      where: {
        isFeatured: true,
      },
    });

    return {
      categories,
    };
  }
}
