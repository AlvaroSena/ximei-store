import { Request, Response, NextFunction } from "express";
import { UploadProductImages } from "../../application/usecases/upload-product-images";
import { z } from "zod";

export class UploadProductImagesController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const uploadProductImagesRequestParams = z.object({
      id: z.uuid(),
    });

    try {
      const { id } = uploadProductImagesRequestParams.parse(request.params);
      const files = request.files as Express.Multer.File[];

      const uploadProductImages = new UploadProductImages();
      const { imageUrls } = await uploadProductImages.execute({ id, files });

      return reply.status(201).json({ imageUrls });
    } catch (err) {
      next(err);
    }
  }
}
