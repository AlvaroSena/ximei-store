import { Request, Response, NextFunction } from "express";
import { CreateProductVariants } from "../../application/usecases/create-product-variants";
import { z } from "zod";

export class CreateProductVariantController {
  async handle(request: Request, reply: Response, next: NextFunction) {
    const createProductVariantsRequestParams = z.object({
      productId: z.uuid(),
    });

    const createProductVariantsRequestBody = z.object({
      variants: z.array(
        z.object({
          title: z.string(),
          price: z.number(),
          basePrice: z.number().optional(),
          isAnOffer: z.boolean(),
        })
      ),
    });

    try {
      const { productId } = createProductVariantsRequestParams.parse(
        request.params
      );
      const { variants } = createProductVariantsRequestBody.parse(request.body);

      const createProductVariants = new CreateProductVariants();

      await createProductVariants.execute({ productId, variants });

      return reply.status(201).send();
    } catch (err) {
      next(err);
    }
  }
}
