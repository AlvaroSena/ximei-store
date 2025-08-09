import { Request, Response } from "express";
import { ResourceNotFoundError } from "../../application/errors/resource-not-found-error";
import { GetCategory } from "../../application/usecases/get-category";

export class GetCategoryController {
  async handle(request: Request, reply: Response) {
    try {
      const { id } = request.params;

      const getCategory = new GetCategory();

      const category = await getCategory.execute({ id });

      reply.json(category);
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        reply.status(404).json({ message: err.message });
      }

      console.log(err);
    }
  }
}
