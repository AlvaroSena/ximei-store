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
      variants: z.array(
        z.object({
          title: z.string(),
          price: z.number(),
        })
      ),
    });

    try {
      const { title, description, price, brand, categoryId, variants } =
        createProductRequestBody.parse(request.body);

      const createProduct = new CreateProduct();

      const { productId } = await createProduct.execute({
        title,
        description,
        price,
        brand,
        categoryId,
        variants,
      });

      return reply.status(201).send({ productId });
    } catch (err) {
      next(err);
    }
  }
}
