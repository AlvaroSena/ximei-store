import { Request, Response } from "express";
import { ResourceNotFoundError } from "../../application/errors/resource-not-found-error";
import { UpdateProduct } from "../../application/usecases/update-product";

export class UpdateProductController {
  async handle(request: Request, reply: Response) {
    try {
      const { id } = request.params;
      const { title, description, price, brand, categoryId } = request.body;

      const updateProduct = new UpdateProduct();

      await updateProduct.execute({
        id,
        title,
        description,
        price,
        brand,
        categoryId,
      });

      reply.status(204).send();
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        reply.status(404).json({ message: err.message });
      }

      console.log(err);
    }
  }
}
