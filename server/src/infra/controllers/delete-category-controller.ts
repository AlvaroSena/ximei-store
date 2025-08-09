import { Request, Response } from "express";
import { ResourceNotFoundError } from "../../application/errors/resource-not-found-error";
import { DeleteCategory } from "../../application/usecases/delete-category";

export class DeleteCategoryController {
  async handle(request: Request, reply: Response) {
    try {
      const { id } = request.params;

      const deleteCategory = new DeleteCategory();

      await deleteCategory.execute({ id });

      reply.status(204).send();
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        reply.status(404).json({ message: err.message });
      }

      console.log(err);
    }
  }
}
