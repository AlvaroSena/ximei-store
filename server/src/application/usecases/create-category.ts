import { prisma } from "../../infra/prisma";
import { slugify } from "../../utils/slugify";

interface CreateCategoryRequest {
  title: string;
}

export class CreateCategory {
  async execute({ title }: CreateCategoryRequest) {
    await prisma.category.create({
      data: {
        title,
        slug: slugify(title),
      },
    });
  }
}
