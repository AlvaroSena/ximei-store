import { Request, Response, NextFunction } from "express";
import { GetProductBySlug } from "../../application/usecases/get-product-by-slug";
import { z } from "zod";

export class GetProductBySlugController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const getProductBySlugRequestParams = z.object({
      slug: z.string(),
    });

    try {
      const { slug } = getProductBySlugRequestParams.parse(request.params);

      const getProduct = new GetProductBySlug();

      const product = await getProduct.execute({ slug });

      return reply.json(product);
    } catch (err) {
      next(err);
    }
  }
}
