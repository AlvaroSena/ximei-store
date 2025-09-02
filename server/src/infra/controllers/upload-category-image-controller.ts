import { Request, Response, NextFunction } from "express";
import { UploadCategoryImage } from "../../application/usecases/upload-category-image";
import { z } from "zod";

export class UploadCategoryImageController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const uploadCategoryImageRequestParams = z.object({
      id: z.uuid(),
    });

    try {
      const { id } = uploadCategoryImageRequestParams.parse(request.params);
      const file = request.file as Express.Multer.File;

      const uploadCategoryImage = new UploadCategoryImage();
      const { imageUrl } = await uploadCategoryImage.execute({
        id,
        file,
      });

      return reply.status(201).json({ imageUrl });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
