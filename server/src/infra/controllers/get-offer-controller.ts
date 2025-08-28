import { Request, Response, NextFunction } from "express";
import { GetOffer } from "../../application/usecases/get-offer";
import { z } from "zod";

export class GetOfferController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const getOfferRequestParams = z.object({
      id: z.uuid(),
    });

    try {
      const { id } = getOfferRequestParams.parse(request.params);

      const getOffer = new GetOffer();
      const { offer } = await getOffer.execute({ id });

      return reply.json({ offer });
    } catch (err) {
      next(err);
    }
  }
}
