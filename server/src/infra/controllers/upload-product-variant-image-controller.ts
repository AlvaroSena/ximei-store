import { Request, Response, NextFunction } from "express";
import { UploadProductVariantImage } from "../../application/usecases/upload-product-variant-image";
import { z } from "zod";

export class UploadProductVariantImageController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const uploadProductVariantImageRequestParams = z.object({
      id: z.uuid(),
    });

    try {
      const { id } = uploadProductVariantImageRequestParams.parse(
        request.params
      );
      const file = request.file as Express.Multer.File;

      const uploadProductVariantImage = new UploadProductVariantImage();
      const { imageUrl } = await uploadProductVariantImage.execute({
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
