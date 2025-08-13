import { TrashIcon } from "@heroicons/react/24/outline";
// import { CartItemQuantityInput } from "./cart-item-quantity-input";
import { useContext } from "react";
import { ShoppingCartContext } from "../contexts/shopping-cart-context";

interface CartItemProps {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  slug: string;
  quantity: number;
}

export function CartItem({
  id,
  imageUrl,
  title,
  price,
  slug,
  quantity,
}: CartItemProps) {
  const { deleteFromCart } = useContext(ShoppingCartContext);

  return (
    <div className="flex flex-row items-start justify-between w-full border-b border-stone-200 py-5">
      <div className="flex flex-row gap-6">
        <img src={imageUrl} alt={title} className="max-w-28" />
        <div className="flex flex-col gap-3">
          <a
            href={`/${slug}`}
            className="text-stone-900 text-lg hover:underline"
          >
            {title}
          </a>
          <span className="text-lg text-semibold text-red-950">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(price)}
          </span>
          <p className="text-stone-900">Quantidade: {quantity}</p>
          {/* <CartItemQuantityInput itemQuantity={quantity} /> */}
        </div>
      </div>
      <button onClick={() => deleteFromCart(id)}>
        <TrashIcon className="size-6 transition text-neutral-400 hover:text-red-950" />
      </button>
    </div>
  );
}
