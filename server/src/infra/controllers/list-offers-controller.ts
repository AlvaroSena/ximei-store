import { Request, Response, NextFunction } from "express";
import { ListOffers } from "../../application/usecases/list-offers";

export class ListOffersController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    try {
      const listOffers = new ListOffers();
      const { offers } = await listOffers.execute();

      return reply.json({ offers });
    } catch (err) {
      next(err);
    }
  }
}
