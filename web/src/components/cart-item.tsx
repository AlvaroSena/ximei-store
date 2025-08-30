import { TrashIcon } from "@heroicons/react/24/outline";
// import { CartItemQuantityInput } from "./cart-item-quantity-input";
import { useContext } from "react";
import { ShoppingCartContext } from "../contexts/shopping-cart-context";
import type { CartItem } from "../types/cart-item";

interface CartItemProps {
  itemIndex: number;
  data: CartItem;
}

export function CartItem({ itemIndex, data }: CartItemProps) {
  const { deleteFromCart } = useContext(ShoppingCartContext);

  function romoveItemFromCart() {
    deleteFromCart(itemIndex);
  }

  return (
    <div className="flex flex-row items-start justify-between w-full border-b border-stone-200 py-5">
      <div className="flex flex-row gap-6">
        <img src={data.imageUrl} alt={data.title} className="max-w-28" />
        <div className="flex flex-col gap-3">
          <a
            href={`/${data.slug}`}
            className="text-stone-900 text-lg hover:underline"
          >
            {data.title}
          </a>
          <span className="text-lg text-semibold text-red-950">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(data.priceInCents / 100)}
          </span>
          <p className="text-stone-900">Quantidade: {data.quantity}</p>
          {/* <CartItemQuantityInput itemQuantity={quantity} /> */}
        </div>
      </div>
      <button onClick={romoveItemFromCart}>
        <TrashIcon className="size-6 transition text-neutral-400 hover:text-red-950" />
      </button>
    </div>
  );
}
