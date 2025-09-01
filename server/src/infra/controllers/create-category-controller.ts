import { Request, Response, NextFunction } from "express";
import { CreateCategory } from "../../application/usecases/create-category";
import { z } from "zod";

export class CreateCategoryController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const createCategoryRequestBody = z.object({
      title: z.string(),
      description: z.string().optional(),
    });

    try {
      const { title, description } = createCategoryRequestBody.parse(
        request.body
      );

      const createCategory = new CreateCategory();

      const { categoryId } = await createCategory.execute({
        title,
        description,
      });

      return reply.status(201).json({
        categoryId,
      });
    } catch (err) {
      next(err);
    }
  }
}
