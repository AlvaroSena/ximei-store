import { Request, Response } from "express";
import { SearchProduct } from "../../application/usecases/search-product";

export class SearchProductController {
  async handle(request: Request, reply: Response) {
    const query = request.query.q as string;

    const searchProduct = new SearchProduct();

    const products = await searchProduct.execute({ query });

    reply.json(products);
  }
}
