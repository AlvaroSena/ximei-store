import { Request, Response, NextFunction } from "express";
import { CreateVariantPromotion } from "../../application/usecases/create-variant-promotion";
import { z } from "zod";

export class CreateVariantPromotionController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const createVariantPromotionRequestBody = z.object({
      variantId: z.string(),
      title: z.string(),
      minQty: z.number(),
      price: z.number(),
    });

    try {
      const { variantId, title, minQty, price } =
        createVariantPromotionRequestBody.parse(request.body);

      const createVariantPromotion = new CreateVariantPromotion();
      const { promotionId } = await createVariantPromotion.execute({
        variantId,
        title,
        minQty,
        price,
      });

      return reply.status(201).json({ promotionId });
    } catch (err) {
      next(err);
    }
  }
}
