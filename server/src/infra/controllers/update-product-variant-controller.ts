import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { UpdateProductVariant } from "../../application/usecases/update-product-variant";

export class UpdateProductVariantController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const updateProductVariantRequestParams = z.object({
      id: z.uuid(),
    });

    const updateProductVariantRequestBody = z.object({
      title: z.string(),
      price: z.number(),
    });

    try {
      const { id } = updateProductVariantRequestParams.parse(request.params);
      const { title, price } = updateProductVariantRequestBody.parse(
        request.body
      );

      const updateProductVariant = new UpdateProductVariant();
      const { variantId } = await updateProductVariant.execute({
        id,
        title,
        price,
      });

      return reply.json({ variantId });
    } catch (err) {
      next(err);
    }
  }
}
