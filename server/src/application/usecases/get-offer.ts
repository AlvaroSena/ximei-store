import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetOfferRequest {
  id: string;
}

export class GetOffer {
  async execute({ id }: GetOfferRequest) {
    const offer = await prisma.offer.findUnique({
      where: {
        id,
      },
    });

    if (!offer) {
      throw new ResourceNotFoundError("Offer not found");
    }

    return {
      offer,
    };
  }
}
