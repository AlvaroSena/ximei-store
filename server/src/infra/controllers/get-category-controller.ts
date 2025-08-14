import { Request, Response, NextFunction } from "express";
import { GetCategory } from "../../application/usecases/get-category";
import { z } from "zod";

export class GetCategoryController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const getCategoryRequestParams = z.object({
      id: z.uuid(),
    });

    try {
      const { id } = getCategoryRequestParams.parse(request.params);

      const getCategory = new GetCategory();

      const category = await getCategory.execute({ id });

      return reply.json(category);
    } catch (err) {
      next(err);
    }
  }
}
