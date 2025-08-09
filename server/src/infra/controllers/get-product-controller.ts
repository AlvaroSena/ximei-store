import { Request, Response } from "express";
import { ResourceNotFoundError } from "../../application/errors/resource-not-found-error";
import { GetProduct } from "../../application/usecases/get-product";

export class GetProductController {
  async handle(request: Request, reply: Response) {
    try {
      const { id } = request.params;

      const getProduct = new GetProduct();

      const product = await getProduct.execute({ id });

      reply.json(product);
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        reply.status(404).json({ message: err.message });
      }

      console.log(err);
    }
  }
}
