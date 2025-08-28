import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteOfferRequest {
  id: string;
}

export class DeleteOffer {
  async execute({ id }: DeleteOfferRequest) {
    const offer = await prisma.offer.findUnique({
      where: {
        id,
      },
    });

    if (!offer) {
      throw new ResourceNotFoundError("Offer not found");
    }

    await prisma.offer.delete({
      where: {
        id,
      },
    });
  }
}
