import { Request, Response, NextFunction } from "express";
import { UpdateCategory } from "../../application/usecases/update-category";
import { z } from "zod";

export class UpdateCategoryController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const updateCategoryRequestParams = z.object({
      id: z.uuid(),
    });

    const updateCategoryRequestBody = z.object({
      title: z.string(),
    });

    try {
      const { id } = updateCategoryRequestParams.parse(request.params);
      const { title } = updateCategoryRequestBody.parse(request.body);

      const updateCategory = new UpdateCategory();

      await updateCategory.execute({ id, title });

      return reply.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
