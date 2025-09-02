import { Request, Response, NextFunction } from "express";
import { ListProductsByCategory } from "../../application/usecases/list-products-by-category";
import { z } from "zod";

export class ListProductsByCategoryController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const listProductsByCategoryRequestParams = z.object({
      categorySlug: z.string(),
    });

    try {
      const { categorySlug } = listProductsByCategoryRequestParams.parse(
        request.params
      );

      const page = parseInt(request.query.page as string) || 1;
      const perPage = parseInt(request.query.perPage as string) || 10;

      const listProductsByCategory = new ListProductsByCategory();
      const products = await listProductsByCategory.execute({
        page,
        perPage,
        categorySlug,
      });

      return reply.json(products);
    } catch (err) {
      next(err);
    }
  }
}
