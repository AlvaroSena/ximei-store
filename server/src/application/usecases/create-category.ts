import { prisma } from "../../infra/prisma";
import { slugify } from "../../utils/slugify";
import { ResourceAlreadyExistsError } from "../errors/resource-already-exists";

interface CreateCategoryRequest {
  title: string;
}

export class CreateCategory {
  async execute({ title }: CreateCategoryRequest) {
    const categorySlug = slugify(title);

    const categoryAlreadyExists = await prisma.category.findUnique({
      where: {
        slug: categorySlug,
      },
    });

    if (categoryAlreadyExists) {
      throw new ResourceAlreadyExistsError("Category already exists");
    }

    await prisma.category.create({
      data: {
        title,
        slug: slugify(title),
      },
    });
  }
}
