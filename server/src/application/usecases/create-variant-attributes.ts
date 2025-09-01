import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

type VariantAttribute = {
  attributeName: string;
  attributeValues: string[];
};

interface CreateVariantAttributesRequest {
  variantId: string;
  attributes: VariantAttribute[];
}

export class CreateVariantAttributes {
  async execute({ variantId, attributes }: CreateVariantAttributesRequest) {
    const variant = await prisma.variant.findUnique({
      where: {
        id: variantId,
      },
    });

    if (!variant) {
      throw new ResourceNotFoundError("Variant not found");
    }

    await Promise.all(
      attributes.map(({ attributeName, attributeValues }) =>
        prisma.variantAttribute.create({
          data: {
            variantId,
            attributeName,
            attributeValues,
          },
        })
      )
    );
  }
}
