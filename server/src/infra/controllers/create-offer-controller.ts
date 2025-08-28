import { Request, Response, NextFunction } from "express";
import { CreateOffer } from "../../application/usecases/create-offer";
import { z } from "zod";

export class CreateOfferController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const createOfferRequestBody = z.object({
      variantId: z.string(),
      title: z.string(),
      minQty: z.number(),
      price: z.number(),
    });

    try {
      const { variantId, title, minQty, price } = createOfferRequestBody.parse(
        request.body
      );

      const createOffer = new CreateOffer();
      const { promotionId } = await createOffer.execute({
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
