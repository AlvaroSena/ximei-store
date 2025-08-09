import { Request, Response } from "express";
import { CreateCategory } from "../../application/usecases/create-category";

export class CreateCategoryController {
  async handle(request: Request, reply: Response) {
    try {
      const { title } = request.body;

      const createCategory = new CreateCategory();

      await createCategory.execute({ title });

      reply.status(201).send();
    } catch (err) {
      console.log(err);
    }
  }
}
