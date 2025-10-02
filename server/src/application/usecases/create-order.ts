import { prisma } from "../../infra/prisma";

type OrderItem = {
  productId: string;
  variantId: string;
  title: string;
  imageUrl: string;
  priceInCents: number;
  slug: string;
  quantity: number;
  totalPriceInCents: number;
  variantAttributesValues: any;
};

interface CreateOrderRequest {
  items: OrderItem[];
  total: number;
}

export class CreateOrder {
  async execute({ total, items }: CreateOrderRequest) {
    const order = await prisma.order.create({
      data: {
        items: JSON.stringify(items),
        totalInCents: total,
      },
    });

    return {
      orderId: order.id,
    };
  }
}
