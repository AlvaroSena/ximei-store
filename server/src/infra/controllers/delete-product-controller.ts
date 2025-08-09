import { Request, Response } from "express";
import { ResourceNotFoundError } from "../../application/errors/resource-not-found-error";
import { DeleteProduct } from "../../application/usecases/delete-product";

export class DeleteProductController {
  async handle(request: Request, reply: Response) {
    try {
      const { id } = request.params;

      const deleteProduct = new DeleteProduct();

      await deleteProduct.execute({ id });

      reply.status(204).send();
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        reply.status(404).json({ message: err.message });
      }

      console.log(err);
    }
  }
}
