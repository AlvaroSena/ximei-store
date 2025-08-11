import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function CartItem() {
  const [quantity, setQuantity] = useState(1);

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
    <div className="flex flex-row items-start justify-between w-full">
      <div className="flex flex-row gap-6">
        <img
          src="https://ximei-store.s3.sa-east-1.amazonaws.com/bolsa-1.jpeg"
          alt=""
          className="max-w-28"
        />
        <div className="flex flex-col gap-3">
          <a href="" className="text-stone-900 text-lg hover:underline">
            Bolsa
          </a>
          <span className="text-lg text-semibold text-red-950">R$ 100,00</span>
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
        </div>
      </div>
      <button>
        <TrashIcon className="size-6 transition text-neutral-400 hover:text-red-950" />
      </button>
    </div>
  );
}
