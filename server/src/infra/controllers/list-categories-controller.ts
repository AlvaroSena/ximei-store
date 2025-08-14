import { Request, Response, NextFunction } from "express";
import { ListCategories } from "../../application/usecases/list-categories";

export class ListCategoriesController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    try {
      const listCategories = new ListCategories();

      const categories = await listCategories.execute();

      return reply.json(categories);
    } catch (err) {
      next(err);
    }
  }
}
