import { prisma } from "../../infra/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetOrderRequest {
  id: string;
}

export class GetOrder {
  async execute({ id }: GetOrderRequest) {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new ResourceNotFoundError("Order not found.");
    }

    const orderItems = JSON.parse(order.items);

    return {
      order: {
        id: order.id,
        items: orderItems,
        totalInCents: order.totalInCents,
        createdAt: order.totalInCents,
      },
    };
  }
}
