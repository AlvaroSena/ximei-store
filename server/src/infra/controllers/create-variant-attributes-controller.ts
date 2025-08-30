import { Request, Response, NextFunction } from "express";
import { CreateVariantAttributes } from "../../application/usecases/create-variant-attributes";
import { z } from "zod";

export class CreateVariantAttributesController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const createVariantAttributesRequestParams = z.object({
      variantId: z.uuid(),
    });

    const createVariantAttributesRequestBody = z.object({
      attributes: z.array(
        z.object({
          attributeName: z.string(),
          attributeValues: z.array(z.string()),
        })
      ),
    });

    try {
      const { variantId } = createVariantAttributesRequestParams.parse(
        request.params
      );
      const { attributes } = createVariantAttributesRequestBody.parse(
        request.body
      );

      const createVariantAttributes = new CreateVariantAttributes();
      await createVariantAttributes.execute({ variantId, attributes });

      return reply.status(201).send();
    } catch (err) {
      next(err);
    }
  }
}
