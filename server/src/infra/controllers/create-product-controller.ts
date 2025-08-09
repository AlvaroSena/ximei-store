import { Request, Response } from "express";
import { CreateProduct } from "../../application/usecases/create-product";
import { ResourceNotFoundError } from "../../application/errors/resource-not-found-error";

export class CreateProductController {
  async handle(request: Request, reply: Response) {
    try {
      const { title, description, price, brand, categoryId } = request.body;

      const createProduct = new CreateProduct();

      await createProduct.execute({
        title,
        description,
        price,
        brand,
        categoryId,
      });

      reply.status(201).send();
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        reply.status(404).json({ message: err.message });
      }

      console.log(err);
    }
  }
}
