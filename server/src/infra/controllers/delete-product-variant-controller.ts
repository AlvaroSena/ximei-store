import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { DeleteProductVariant } from "../../application/usecases/delete-product-variant";

export class DeleteProductVariantController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const deleteProductVariantRequestParams = z.object({
      id: z.uuid(),
    });

    try {
      const { id } = deleteProductVariantRequestParams.parse(request.params);

      const deleteProductVariant = new DeleteProductVariant();

      await deleteProductVariant.execute({ id });

      return reply.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
