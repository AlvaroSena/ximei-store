import { Request, Response, NextFunction } from "express";
import { CreateCategory } from "../../application/usecases/create-category";
import { z } from "zod";

export class CreateCategoryController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const createCategoryRequestBody = z.object({
      title: z.string(),
    });

    try {
      const { title } = createCategoryRequestBody.parse(request.body);

      const createCategory = new CreateCategory();

      await createCategory.execute({ title });

      return reply.status(201).send();
    } catch (err) {
      next(err);
    }
  }
}
