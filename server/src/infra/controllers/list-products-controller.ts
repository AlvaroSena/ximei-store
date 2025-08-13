import { Request, Response } from "express";
import { ListProducts } from "../../application/usecases/list-products";

export class ListProductsController {
  async handle(request: Request, reply: Response) {
    try {
      const page = parseInt(request.query.page as string) || 1;
      const perPage = parseInt(request.query.perPage as string) || 10;

      const listProducts = new ListProducts();

      const products = await listProducts.execute({ page, perPage });

      reply.json(products);
    } catch (err) {
      console.log(err);
    }
  }
}
