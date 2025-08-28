import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetProductRequest {
  slug: string;
  variantSlug?: string;
}

export class GetProductBySlug {
  async execute({ slug, variantSlug }: GetProductRequest) {
    let product = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        variants: {
          include: {
            attributes: true,
            offers: true,
          },
        },
      },
    });

    if (!product) {
      throw new ResourceNotFoundError("Product not found");
    }

    if (variantSlug) {
      const variant = product.variants.find(
        (variant) => variant.slug === variantSlug
      );

      return {
        product: {
          id: product.id,
          imageUrl: product.imageUrl,
          title: product.title,
          description: product.description,
          slug: product.slug,
          brand: product.brand,
          categoryId: product.categoryId,
          createdAt: product.createdAt,
          variant,
        },
      };
    }

    return {
      product,
    };
  }
}
