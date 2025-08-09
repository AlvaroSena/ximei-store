import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetCategoryRequest {
  id: string;
}

export class GetCategory {
  async execute({ id }: GetCategoryRequest) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new ResourceNotFoundError("Category not found");
    }

    return {
      category,
    };
  }
}
