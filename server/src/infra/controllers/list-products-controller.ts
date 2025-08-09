import { Request, Response } from "express";
import { ListProducts } from "../../application/usecases/list-products";

export class ListProductsController {
  async handle(request: Request, reply: Response) {
    try {
      const listProducts = new ListProducts();

      const products = await listProducts.execute();

      reply.json(products);
    } catch (err) {
      console.log(err);
    }
  }
}
