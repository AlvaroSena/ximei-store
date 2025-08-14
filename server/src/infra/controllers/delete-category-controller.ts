import { Request, Response, NextFunction } from "express";
import { DeleteCategory } from "../../application/usecases/delete-category";
import { z } from "zod";

export class DeleteCategoryController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const deleteCategoryRequestParams = z.object({
      id: z.uuid(),
    });

    try {
      const { id } = deleteCategoryRequestParams.parse(request.params);

      const deleteCategory = new DeleteCategory();

      await deleteCategory.execute({ id });

      return reply.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
