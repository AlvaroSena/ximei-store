import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { env } from "../../utils/env";
import { prisma } from "../../infra/prisma";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../infra/aws/s3";

interface UploadCategoryImageRequest {
  id: string;
  file: Express.Multer.File;
}

export class UploadCategoryImage {
  async execute({ id, file }: UploadCategoryImageRequest) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new ResourceNotFoundError("Category not found");
    }

    const key = `collections/${category.id}-${file.originalname}`;

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
