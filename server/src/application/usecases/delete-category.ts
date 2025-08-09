import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteCategoryRequest {
  id: string;
}

export class DeleteCategory {
  async execute({ id }: DeleteCategoryRequest) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new ResourceNotFoundError("Category not found");
    }

    await prisma.category.delete({
      where: {
        id: category.id,
      },
    });
  }
}
