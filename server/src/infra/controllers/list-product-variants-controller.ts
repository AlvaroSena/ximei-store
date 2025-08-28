import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ListProductVariants } from "../../application/usecases/list-product-variants";

export class ListProductVariantsController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    try {
      const listProductVariantsRequestParams = z.object({
        productId: z.uuid(),
      });

      const { productId } = listProductVariantsRequestParams.parse(
        request.params
      );

      const listProductVariants = new ListProductVariants();
      const { variants } = await listProductVariants.execute({
        productId,
      });

      return reply.json({ variants });
    } catch (err) {
      next(err);
    }
  }
}
