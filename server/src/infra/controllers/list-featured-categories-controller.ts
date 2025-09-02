import { Request, Response, NextFunction } from "express";
import { ListFeaturedCategories } from "../../application/usecases/list-featured-categories";

export class ListFeaturedCategoriesController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    try {
      const listCategories = new ListFeaturedCategories();

      const categories = await listCategories.execute();

      return reply.json(categories);
    } catch (err) {
      next(err);
    }
  }
}
