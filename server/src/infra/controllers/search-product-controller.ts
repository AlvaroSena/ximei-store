import { Request, Response, NextFunction } from "express";
import { SearchProduct } from "../../application/usecases/search-product";

export class SearchProductController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    try {
      const query = request.query.q as string;

      const searchProduct = new SearchProduct();

      const products = await searchProduct.execute({ query });

      return reply.json(products);
    } catch (err) {
      next(err);
    }
  }
}
