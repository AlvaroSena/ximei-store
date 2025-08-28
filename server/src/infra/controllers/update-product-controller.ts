import { Request, Response, NextFunction } from "express";
import { UpdateProduct } from "../../application/usecases/update-product";
import { z } from "zod";

export class UpdateProductController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const updateProductRequestParams = z.object({
      id: z.uuid(),
    });

    const updateProductRequestBody = z.object({
      title: z.string(),
      description: z.string(),
      brand: z.string(),
      categoryId: z.string(),
    });

    try {
      const { id } = updateProductRequestParams.parse(request.params);
      const { title, description, brand, categoryId } =
        updateProductRequestBody.parse(request.body);

      const updateProduct = new UpdateProduct();

      await updateProduct.execute({
        id,
        title,
        description,
        brand,
        categoryId,
      });

      return reply.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
