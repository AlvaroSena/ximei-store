import { Request, Response } from "express";
import { ResourceNotFoundError } from "../../application/errors/resource-not-found-error";
import { GetProductBySlug } from "../../application/usecases/get-product-by-slug";

export class GetProductBySlugController {
  async handle(request: Request, reply: Response) {
    try {
      const { slug } = request.params;

      const getProduct = new GetProductBySlug();

      const product = await getProduct.execute({ slug });

      reply.json(product);
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        reply.status(404).json({ message: err.message });
      }

      console.log(err);
    }
  }
}
