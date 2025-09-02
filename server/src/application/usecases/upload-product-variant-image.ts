import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { env } from "../../utils/env";
import { prisma } from "../../infra/prisma";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../infra/aws/s3";

interface UploadProductVariantImageRequest {
  id: string;
  file: Express.Multer.File;
}

export class UploadProductVariantImage {
  async execute({ id, file }: UploadProductVariantImageRequest) {
    const variant = await prisma.variant.findUnique({
      where: {
        id,
      },
    });

    if (!variant) {
      throw new ResourceNotFoundError("Product variant not found");
    }

    const key = `variants/${variant.id}-${file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: env.AWS_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    const imageUrl = `https://${env.AWS_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;

    await prisma.variant.update({
      where: {
        id,
      },
      data: {
        imageUrl,
      },
    });

    return {
      imageUrl,
    };
  }
}
