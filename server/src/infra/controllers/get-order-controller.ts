import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { GetOrder } from "../../application/usecases/get-order";

export class GetOrderController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const getOrderRequestParams = z.object({
      id: z.ulid(),
    });

    try {
      const { id } = getOrderRequestParams.parse(request.params);

      const getOrder = new GetOrder();

      const order = await getOrder.execute({ id });

      return reply.json(order);
    } catch (err) {
      next(err);
    }
  }
}
