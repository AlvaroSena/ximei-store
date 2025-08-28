import { Request, Response, NextFunction } from "express";
import { DeleteOffer } from "../../application/usecases/delete-offer";
import { z } from "zod";

export class DeleteOfferController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const deleteOfferRequestParams = z.object({
      id: z.uuid(),
    });

    try {
      const { id } = deleteOfferRequestParams.parse(request.params);

      const deleteOffer = new DeleteOffer();
      await deleteOffer.execute({ id });

      return reply.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
