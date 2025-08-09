import { prisma } from "../../infra/prisma";

export class ListProducts {
  async execute() {
    const products = await prisma.product.findMany();

    return {
      products,
    };
  }
}
