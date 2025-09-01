import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteProductVariantRequest {
  id: string;
}

export class DeleteProductVariant {
  async execute({ id }: DeleteProductVariantRequest) {
    const variant = await prisma.variant.findUnique({
      where: {
        id,
      },
    });

    if (!variant) {
      throw new ResourceNotFoundError("Variant not found");
    }

    await prisma.variant.delete({
      where: {
        id,
      },
    });
  }
}
