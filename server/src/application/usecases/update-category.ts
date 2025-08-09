import { prisma } from "../../infra/prisma";
import { slugify } from "../../utils/slugify";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateCategoryRequest {
  id: string;
  title: string;
}

export class UpdateCategory {
  async execute({ id, title }: UpdateCategoryRequest) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new ResourceNotFoundError("Category not found");
    }

    await prisma.category.update({
      where: {
        id,
      },
      data: {
        title,
        slug: slugify(title),
      },
    });
  }
}
