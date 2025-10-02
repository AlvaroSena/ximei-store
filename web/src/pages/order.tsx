import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../lib/api";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { OrderItem } from "../components/order-item";
import { Link, Title } from "react-head";
import type { CartItem as CartItemType } from "../types/cart-item";

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

  return (
    <div className="px-4 lg:px-0 max-w-[1120px] mx-auto py-8">
      <Title>{data.order ? `Resumo do pedido | Loja Ximei` : "Carregando..."}</Title>

      <Link rel="canonical" href={`https://ximei.vercel.app/orders/${orderId}`} />

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
