import { Request, Response, NextFunction } from "express";
import { GetProduct } from "../../application/usecases/get-product";
import { z } from "zod";

export class GetProductController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const getProductRequestParams = z.object({
      id: z.uuid(),
    });

    try {
      const { id } = getProductRequestParams.parse(request.params);

      const getProduct = new GetProduct();

      const product = await getProduct.execute({ id });

      return reply.json(product);
    } catch (err) {
      next(err);
    }
  }
}
