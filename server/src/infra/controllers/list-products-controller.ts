import { Request, Response, NextFunction } from "express";
import { ListProducts } from "../../application/usecases/list-products";
import { ListProductsLocal } from "../../application/usecases/list-products-local";

export class ListProductsController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    try {
      const page = parseInt(request.query.page as string) || 1;
      const perPage = parseInt(request.query.perPage as string) || 10;

      if (process.env.NODE_ENV === "production") {
        const listProducts = new ListProducts();
        const products = await listProducts.execute({ page, perPage });

        return reply.json(products);
      }

      const listProductsLocal = new ListProductsLocal(); // Redis data in a Docker container
      const products = await listProductsLocal.execute({ page, perPage });

      return reply.json(products);
    } catch (err) {
      next(err);
    }
  }
}
