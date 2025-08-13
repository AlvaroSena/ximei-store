import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

interface QuantityInputProps {
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}

export function QuantityInput({
  quantity,
  increaseQuantity,
  decreaseQuantity,
}: QuantityInputProps) {
  return (
    <div className="flex flex-row items-center justify-between">
      <p className="font-medium text-stone-900">Quantidade</p>

      <div className="flex flex-row items-center gap-2">
        <button onClick={decreaseQuantity} className="p-3">
          <MinusIcon className="size-5 text-stone-900 transition hover:opacity-50" />
        </button>
        <span className="block text-stone-900 font-medium py-3 px-4">
          {quantity}
        </span>
        <button onClick={increaseQuantity} className="p-3">
          <PlusIcon className="size-5 text-stone-900 transition hover:opacity-50" />
        </button>
      </div>
    </div>
  );
}
