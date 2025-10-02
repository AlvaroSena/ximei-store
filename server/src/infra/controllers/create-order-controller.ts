import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { CreateOrder } from "../../application/usecases/create-order";

export class CreateOrderController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const createOrderRequestBody = z.object({
      items: z.array(
        z.object({
          productId: z.uuid(),
          variantId: z.uuid(),
          title: z.string(),
          imageUrl: z.url(),
          priceInCents: z.number(),
          slug: z.string(),
          quantity: z.number(),
          totalPriceInCents: z.number(),
          variantAttributesValues: z.array(
            z.object({
              quantity: z.number(),
              firstSize: z.string(),
              secondSize: z.string().nullable(),
            }),
          ),
        }),
      ),
      total: z.number(),
    });

    try {
      const { items, total } = createOrderRequestBody.parse(request.body);

      const createOrder = new CreateOrder();
      const { orderId } = await createOrder.execute({ items, total });

      return reply.status(201).json({ orderId });
    } catch (err) {
      next(err);
    }
  }
}
