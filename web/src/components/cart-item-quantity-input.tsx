import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

interface CartItemQuantityInputProps {
  itemQuantity: number;
}

export function CartItemQuantityInput({
  itemQuantity,
}: CartItemQuantityInputProps) {
  const [quantity, setQuantity] = useState(itemQuantity);

  function increaseQuantity() {
    setQuantity(quantity + 1);
  }

  function decreaseQuantity() {
    if (quantity === 1) {
      return;
    }

    setQuantity(quantity - 1);
  }

  return (
    <div className="flex flex-row items-center gap-4">
      <button
        className="p-3 rounded-full bg-neutral-100 transition hover:bg-neutral-200"
        onClick={decreaseQuantity}
      >
        <MinusIcon className="size-4 text-stone-950 " />
      </button>
      <p className="text-stone-950">{quantity}</p>
      <button
        className="p-3 rounded-full bg-neutral-100 transition hover:bg-neutral-200"
        onClick={increaseQuantity}
      >
        <PlusIcon className="size-4 text-stone-950 " />
      </button>
    </div>
  );
}
