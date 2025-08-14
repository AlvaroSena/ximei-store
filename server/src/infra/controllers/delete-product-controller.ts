import { Request, Response, NextFunction } from "express";
import { DeleteProduct } from "../../application/usecases/delete-product";
import { z } from "zod";

export class DeleteProductController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const deleteProductRequestParams = z.object({
      id: z.uuid(),
    });

    try {
      const { id } = deleteProductRequestParams.parse(request.params);

      const deleteProduct = new DeleteProduct();

      await deleteProduct.execute({ id });

      return reply.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
