import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { env } from "../../utils/env";
import { prisma } from "../../infra/prisma";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../infra/aws/s3";

interface UploadProductImagesRequest {
  id: string;
  files: Express.Multer.File[];
}

export class UploadProductImages {
  async execute({ id, files }: UploadProductImagesRequest) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new ResourceNotFoundError("Product not found");
    }

    const uploadPromises = files.map(async (file) => {
      const key = `products/${product.id}-${file.originalname}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: env.AWS_BUCKET,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
      );

      const url = `https://${env.AWS_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;

      return url;
    });

    const imageUrls = await Promise.all(uploadPromises);

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        imageUrls,
      },
    });

    return {
      imageUrls,
    };
  }
}
