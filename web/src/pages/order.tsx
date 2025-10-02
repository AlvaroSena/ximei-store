import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../lib/api";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { OrderItem } from "../components/order-item";
import type { CartItem as CartItemType } from "../types/cart-item";
import { Meta } from "react-head";

export function Order() {
  const { orderId } = useParams();

  if (!orderId) {
    return;
  }

  const { data, isPending, error } = useQuery({
    queryKey: ["order"],
    queryFn: () => getOrder(orderId),
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h3 className="text-xl font-semibold text-stone-900">Pedido não foi encontrado.</h3>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin text-red-900 size-10" />
      </div>
    );
  }

  const imageUrl = data.order.items[0].imageUrl;
  const orderUrl = `${import.meta.env.VITE_APP_URL}/orders/${orderId}`;

  return (
    <div className="px-4 lg:px-0 max-w-[1120px] mx-auto py-8">
      <Meta property="og:title" content="Resumo do pedido" />
      <Meta property="og:description" content="Confira os itens antes de finalizar no WhatsApp." />
      <Meta property="og:image" content={imageUrl} />
      <Meta property="og:url" content={orderUrl} />
      <Meta property="og:type" content="website" />

      <h1 className="text-2xl font-bold text-stone-900">Resumo do pedido do(a) cliente</h1>

      {data.order.items.map((item: CartItemType, index: number) => {
        return <OrderItem key={index} data={item} />;
      })}

      <footer className="border-t border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xl text-red-950">Total</p>
          <p className="text-xl font-semibold text-red-950">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(data.order.totalInCents / 100)}
          </p>
        </div>
      </footer>
    </div>
  );
}
