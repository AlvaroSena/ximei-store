import { Request, Response } from "express";
import { UpdateCategory } from "../../application/usecases/update-category";
import { ResourceNotFoundError } from "../../application/errors/resource-not-found-error";

export class UpdateCategoryController {
  async handle(request: Request, reply: Response) {
    try {
      const { id } = request.params;
      const { title } = request.body;

      const updateCategory = new UpdateCategory();

      await updateCategory.execute({ id, title });

      reply.status(204).send();
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        reply.status(404).json({ message: err.message });
      }

      console.log(err);
    }
  }
}
