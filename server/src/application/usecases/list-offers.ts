import { prisma } from "../../infra/prisma";

export class ListOffers {
  async execute() {
    const offers = await prisma.offer.findMany();

    return {
      offers,
    };
  }
}
