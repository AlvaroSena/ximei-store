import { prisma } from "../../infra/prisma";

export class ListCategories {
  async execute() {
    const categories = await prisma.category.findMany();

    return {
      categories,
    };
  }
}
