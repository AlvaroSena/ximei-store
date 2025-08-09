import { Request, Response } from "express";
import { ListCategories } from "../../application/usecases/list-categories";

export class ListCategoriesController {
  async handle(request: Request, reply: Response) {
    try {
      const listCategories = new ListCategories();

      const categories = await listCategories.execute();

      reply.json(categories);
    } catch (err) {
      console.log(err);
    }
  }
}
