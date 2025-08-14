import { Request, Response, NextFunction } from "express";
import { CreateProduct } from "../../application/usecases/create-product";
import { z } from "zod";

export class CreateProductController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const createProductRequestBody = z.object({
      title: z.string(),
      description: z.string(),
      price: z.number(),
      brand: z.string(),
      categoryId: z.uuid(),
    });

    try {
      const { title, description, price, brand, categoryId } =
        createProductRequestBody.parse(request.body);

      const createProduct = new CreateProduct();

      await createProduct.execute({
        title,
        description,
        price,
        brand,
        categoryId,
      });

      return reply.status(201).send();
    } catch (err) {
      next(err);
    }
  }
}
