import type { CartItem } from "../types/cart-item";

interface OrderItemProps {
  data: CartItem;
}

export function OrderItem({ data }: OrderItemProps) {
  return (
    <div className="flex flex-row items-start justify-between w-full border-b border-stone-200 py-5">
      <div className="flex flex-row gap-6">
        <img src={data.imageUrl} alt={data.title} className="max-w-28 object-cover" />
        <div className="flex flex-col gap-3">
          <span className="text-xl text-bold text-stone-900">{data.title}</span>
          <span className="text-lg text-semibold text-red-950">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(data.priceInCents / 100)}
          </span>
          <p className="text-stone-900">Quantidade: {data.quantity}</p>
          <div>
            Tamanhos:{" "}
            {data.variantAttributesValues.map((value: any, index: number) => {
              return (
                <div key={index}>
                  <div className="flex flex-row items-center gap-1">
                    {value.quantity}x {value.firstSize}{" "}
                    {value.secondSize !== null && (
                      <p>
                        e {value.quantity}x {value.secondSize}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
